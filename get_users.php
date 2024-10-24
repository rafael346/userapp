<?php
require 'db_connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Tentativa de executar a query e buscar os dados
try {
    $stmt = $pdo->query("SELECT * FROM users");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Retorna a lista de usuários como JSON


    echo json_encode($users);

} catch (PDOException $e) {
    // Em caso de erro, retorna uma mensagem de erro em formato JSON
    echo json_encode([
        "error" => true,
        "message" => "Erro ao buscar usuários: " . $e->getMessage()
    ]);
}
?>