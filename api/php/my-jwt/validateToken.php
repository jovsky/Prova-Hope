<?php

function validateToken($token, $secret) {

    $tokenArray = explode('.', $token);
    
    $header = $tokenArray[0];
    $payload = $tokenArray[1];
    $signature = $tokenArray[2];

    $generatedSignature = hash_hmac('sha256', "$header.$payload", $secret, true);
    $generatedSignature = base64_encode($generatedSignature);

    if ($generatedSignature !== $signature) {
        return false;
    }
    $payload = json_decode(base64_decode($payload));
    
    return $payload->exp > time();
}

?>