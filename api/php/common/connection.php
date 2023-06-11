<?php

include "./config.php";

global $dbname;

header("Access-Control-Allow-Origin: http://127.0.0.1:5173");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $conn = new PDO("mysql:host=$host;port=3306;dbname=$dbname;charset=utf8", $username, $userPassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo "Erro ao conectar ao banco de dados: " . $e->getMessage() . "<br>";
    exit;
}
?>