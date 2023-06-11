<?php 

function hashPassword($password, $salt){
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12, 'salt' => $salt]);
}

?>