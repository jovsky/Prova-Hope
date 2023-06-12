<?php

include "./../common/config.php";

function createProductsTable ($conn, $arrProducts) {

    global $dbName, $dataTableName;

    $tableColumns = getTableColumnInfoFromJSON($arrProducts);
    $arrColNames = array_keys(get_object_vars($tableColumns));

    $createTableQuery = generateCreateTableQuery($dbName, $dataTableName, $tableColumns);

    try{
        $conn->exec($createTableQuery);
    
        echo "Table '$dataTableName' created successfully.<br><br>";
    } catch(PDOException $e) {
        echo "Error creating the table: " . $e->getMessage();
        exit;
    }
    
    try {

        $insertQuery = "INSERT INTO $dbName.$dataTableName (" . implode(", ", $arrColNames) . ") VALUES (:" . implode(", :", $arrColNames) . ")";

        $stmt = $conn->prepare($insertQuery);
        foreach ($arrProducts as $row) {
            $stmt->execute($row);
        }

        echo "Rows inserted successfully in table $dataTableName.<br><br>";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
        exit;
    }

}

function getTableColumnInfoFromJSON($arrProducts) {
    $tableColumns = new stdClass();
    foreach($arrProducts as $product) {
        foreach ($product as $colName => $colValue) {
            if (property_exists($tableColumns, $colName) and $tableColumns->$colName !== 'NULL') {
                continue;
            }
            $columnType = gettype($colValue);
            if ($columnType === 'string') {
                $columnType = 'VARCHAR(255)';
            }
            elseif ($columnType === 'double') {
                $columnType = 'DECIMAL';
            }
            $tableColumns->$colName = $columnType;
        }
        if (!anyColumnMissingType($tableColumns)) {
            break;
        }
    }
    return $tableColumns;
}

function anyColumnMissingType($tableColumns) {
    foreach ($tableColumns as $value) {
        if ($value === "NULL") {
            return true;
        }
    }
    return false;
}


function generateCreateTableQuery($dbName, $dataTableName, $tableColumns) {
    $query = "CREATE TABLE $dbName.$dataTableName (";
    $primaryKeySet = false;

    foreach ($tableColumns as $columnName => $columnType) {
        $query .= "$columnName $columnType";
        if ($columnName === 'id') {
            $query .= " PRIMARY KEY";
            $primaryKeySet = true;
        }
        $query .= ",";
    }
    if ($primaryKeySet) {
        $query = rtrim($query, ', ');
    }

    $query .= ");";
    return $query;
}
?>