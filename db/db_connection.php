<?php
$host = 'localhost';
$dbname = 'users_app';
$username = 'root'; // ou o usuário do seu banco
$password = 123456; // a senha do seu banco

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}
?>