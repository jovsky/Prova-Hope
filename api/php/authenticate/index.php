<?php

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

$email = $data['email'];
$password = $data['password'];

try {
        
    include "./../common/hashPassFunction.php";
    include "./../common/connection.php";

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
            $response = ['success' => true,'message' => 'Login feito com sucesso!'];
        } else {
            // $response = ['success' => false,'message' => $password." | " .$hashedPassword." | " .$dbPasswordHash." | ". $salt];
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