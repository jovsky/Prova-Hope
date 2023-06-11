<?php

include "./../common/connection.php";

global $dbName, $dataTableName;

$stmt = $conn->query("SELECT * FROM $dbName.$dataTableName");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);

?>