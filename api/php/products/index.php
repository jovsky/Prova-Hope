<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include "./../common/config.php";
include "./../common/connection.php";
include "./../my-jwt/validateToken.php";
include "./../my-jwt/secret.php";

if (!$conn) {
    $response = ['success' => false,'message' => 'Falha na conexão com o banco de dados',];
    echo json_encode($response);
}

$token = null;
$headers = getallheaders();

if (isset($headers['Authorization']) && preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
    $token = $matches[1];
}

$validToken = validateToken($token, $secret);
$products = [];

if ($validToken) {
    global $dbName, $dataTableName;
    
    $stmt = $conn->query("SELECT * FROM $dbName.$dataTableName");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $products = $data;
}

$response = ['validToken' => $validToken,'products' => $products];
echo json_encode($response);

$conn = null;
?>