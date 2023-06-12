<?php

global $dbname, $host;

try {

    $conn = new PDO("mysql:host=$host;port=3306;dbname=$dbname;charset=utf8", $username, $userPassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro ao conectar ao banco de dados: " . $e->getMessage() . "<br>";
    exit;
}
?>