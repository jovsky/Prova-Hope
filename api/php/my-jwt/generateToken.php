<?php


function generateToken($email, $secret) {
    
    $header = [
        'alg' => 'HS256',
        'typ' => 'JWT'
    ];

    $header = base64_encode(json_encode($header));
    
    $payload = [
        'expiration' => time() + (2 * 60),
        'email' => $email,
    ];
    
    $payload = base64_encode(json_encode($payload));
   
    $signature = hash_hmac('sha256', "$header.$payload", $secret, true);

    $signature = base64_encode($signature);
    
    $token = "$header.$payload.$signature";

    return $token;
}
?>
