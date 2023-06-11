<?php

include "./../common/config.php";

function createUsersTable ($conn) {

    global $dbName, $usersTableName;
    
    try{
        $createTableQuery = "CREATE TABLE $dbName.$usersTableName (email VARCHAR(100), password VARCHAR(100), salt VARCHAR(100))";
        $conn->exec($createTableQuery);
    
        echo "Table '$usersTableName' created successfully.<br><br>";
    } catch(PDOException $e) {
        echo "Error creating the table: " . $e->getMessage();
        exit;
    }
}