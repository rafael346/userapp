<?php
require 'db_connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Verifica se o ID do usuário foi enviado via GET
if (isset($_GET['id'])) {
    $userId = $_GET['id'];

    try {
        // Prepara a query para buscar o usuário com o ID fornecido
        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);

        // Executa a query
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Retorna os dados do usuário em formato JSON
            echo json_encode($user);
        } else {
            // Retorna um erro se o usuário não for encontrado
            echo json_encode([
                "error" => true,
                "message" => "Usuário não encontrado."
            ]);
        }
    } catch (PDOException $e) {
        // Retorna uma mensagem de erro em formato JSON
        echo json_encode([
            "error" => true,
            "message" => "Erro ao buscar usuário: " . $e->getMessage()
        ]);
    }
} else {
    // Retorna uma resposta de erro se o ID não for enviado
    echo json_encode([
        "error" => true,
        "message" => "ID do usuário não fornecido."
    ]);
}
?>
