<?php
require 'db/db_connection.php';

// Query para buscar todos os usuários
$stmt = $pdo->query("SELECT * FROM users");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Retorna a lista de usuários como JSON
echo json_encode($users);
?>