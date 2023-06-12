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
    include "./../common/hashPassFunction.php";
    include "./../my-jwt/generateToken.php";
    include "./../my-jwt/secret.php";
    include "./../common/connection.php";

    if (!$conn) {
        $response = ['success' => false,'message' => 'Falha na conexão com o banco de dados',];
        echo json_encode($response);
        return;
    }

    global $dbName, $usersTableName;

    $stmt = $conn->query("SELECT * FROM $dbName.$usersTableName WHERE email=\"$email\"");
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    
    if (!$user) {
        $response = ['success' => false,'message' => 'Nenhum usuário cadastrado com este e-mail'];
    }
    else {
        $dbPasswordHash = $user['password'];
        $salt = $user['salt'];
        $hashedPassword = hashPassword($password, $salt);

        if ($hashedPassword === $dbPasswordHash) {   
            $token = generateToken($email, $secret);
            $response = ['success' => true,'message' => 'Login feito com sucesso!', 'token'=>$token];
        } else {
            $response = ['success' => false,'message' => 'E-mail ou senha inválidos'];
        }
    }

    echo json_encode($response);
} catch (PDOException $e) {
    $response = ['success' => false,'message' => 'Error: ' . $e->getMessage()];
    echo json_encode($response);
}

$conn = null;

?>