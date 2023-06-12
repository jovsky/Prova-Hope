<?php

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

$email = $data['email'];
$password = $data['password'];

try {

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    include "./../common/config.php";
    include "./../common/connection.php";
    include "./../common/hashPassFunction.php";

    if (!$conn) {
        $response = ['success' => false,'message' => 'Falha na conexão com o banco de dados',];
        echo json_encode($response);
        return;
    }

    global $dbName, $usersTableName;

    $stmt = $conn->query("SELECT * FROM $dbName.$usersTableName WHERE email=\"$email\"");
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $response = ['success' => false,'message' => 'E-mail já cadastrado'];
    } else {
        $salt = bin2hex(random_bytes(16));
        $hashedPassword = hashPassword($password, $salt);
        $conn->exec("INSERT INTO $dbName.$usersTableName (email, password, salt) VALUES (\"$email\", \"$hashedPassword\", \"$salt\")");
        $response = ['success' => true,'message' => 'Usuário criado com sucesso'];
    }

    echo json_encode($response);
} catch (PDOException $e) {
    $response = ['success' => false,'message' => 'Error: ' . $e->getMessage()];
    echo json_encode($response);
}

$conn = null;

?>