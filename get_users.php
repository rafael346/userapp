<?php
require 'db_connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
// Query para buscar todos os usuários
$stmt = $pdo->query("SELECT * FROM users");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Retorna a lista de usuários como JSON
echo json_encode($users);
?>