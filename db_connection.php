<?php
$host = 'localhost';
$dbname = 'usuarios_app';
$username = 'root'; // ou o usuário do seu banco
$password = 'Ri0402!Pass'; // a senha do seu banco

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}
?>