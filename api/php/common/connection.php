<?php

global $dbname, $host;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

try {

    $conn = new PDO("mysql:host=$host;port=3306;dbname=$dbname;charset=utf8", $username, $userPassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro ao conectar ao banco de dados: " . $e->getMessage() . "<br>";
    exit;
}
?>