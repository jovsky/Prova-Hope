<?php

include "./../common/config.php";
include "./../common/connection.php";

if (!$conn) {
    $response = ['success' => false,'message' => 'Falha na conexão com o banco de dados',];
    echo json_encode($response);
}

global $dbName, $dataTableName;

$stmt = $conn->query("SELECT * FROM $dbName.$dataTableName");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);

?>