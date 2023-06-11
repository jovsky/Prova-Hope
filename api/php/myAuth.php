<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

$email = $data['email'];

$response = ['result' => true, 'email' => $email];
echo json_encode($response);
?>
