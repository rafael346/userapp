<?php
require 'db_connection.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Verifica se os dados necessários foram enviados
if (isset($_POST['id'], $_POST['name'], $_POST['email'], $_POST['status'], $_POST['admission_date'])) {
    $userId = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $status = $_POST['status'];
    $admission_date = $_POST['admission_date'];

    try {
        // Prepara a query para atualizar os dados do usuário
        $stmt = $pdo->prepare("
            UPDATE users 
            SET name = :name, email = :email, status = :status, admission_date = :admission_date 
            WHERE id = :id
        ");
        
        // Associa os parâmetros
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':admission_date', $admission_date);
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);

        // Executa a query
        if ($stmt->execute()) {
            // Retorna uma resposta de sucesso
            echo json_encode([
                "success" => true,
                "message" => "Usuário atualizado com sucesso."
            ]);
        } else {
            // Retorna uma resposta de erro
            echo json_encode([
                "error" => true,
                "message" => "Erro ao atualizar usuário."
            ]);
        }
    } catch (PDOException $e) {
        // Retorna uma mensagem de erro em formato JSON
        echo json_encode([
            "error" => true,
            "message" => "Erro ao atualizar usuário: " . $e->getMessage()
        ]);
    }
} else {
    // Retorna uma resposta de erro se algum dado estiver faltando
    echo json_encode([
        "error" => true,
        "message" => "Dados incompletos fornecidos."
    ]);
}
?>
