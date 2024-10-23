<?php
require 'db/db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $status = $_POST['status'];
    $admission_date = $_POST['admission_date'];

    // Validação básica
    if (empty($name) || empty($email) || empty($status) || empty($admission_date)) {
        echo json_encode(['error' => 'Preencha todos os campos!']);
        exit;
    }

    // Inserir usuário no banco
    $stmt = $pdo->prepare("INSERT INTO users (name, email, status, admission_date) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $status, $admission_date]);

    echo json_encode(['success' => 'Usuário adicionado com sucesso!']);
}
?>
