<?php

include "../common/config.php";
include "./createProductsTable.php";
include "./createUsersTable.php";

// Script usado para reacriar o banco de dados,
// criar e popular dinamicamente a tabela de produtos usando o arquivo data.json
// e criar a tabela de usuários

function connect() {

    global $host, $rootUsername, $rootPassword;

    try {
        echo "Connecting root... ";
        $conn = new PDO("mysql:host=".$host.";port=3306;charset=utf8", $rootUsername, $rootPassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connected! <br><br>";
        return $conn;
    } catch (PDOException $e) {
        echo "Error to connect to database: " . $e->getMessage() . "<br>";
        exit;
    }
}

function create() {
    global $dbName, $username, $dataTableName, $usersTableName;

    // Read JSON Data

    $jsonData = file_get_contents('./JSON/data.json');
    $arrProducts = json_decode($jsonData, true);

    if ($arrProducts === null) {
        echo "Error decoding JSON data.<br>";
        exit;
    } 

    $conn = connect();

    try{
        $conn->exec("DROP DATABASE IF EXISTS $dbName");
        $conn->exec("CREATE DATABASE $dbName");

        echo "Database '$dbName' created successfully.<br><br>";
    } catch(PDOException $e) {
        echo "Error creating the database: " . $e->getMessage();
        exit;
    }
    
    createProductsTable($conn, $arrProducts);
    createUsersTable($conn);

    $conn->exec("GRANT SELECT ON $dbName.$dataTableName TO '$username'@'%'");
    $conn->exec("GRANT SELECT ON $dbName.$usersTableName TO '$username'@'%'");
    $conn->exec("GRANT INSERT ON $dbName.$usersTableName TO '$username'@'%'");
    $conn->exec("FLUSH PRIVILEGES");

    $conn = null;

}


create();
?>