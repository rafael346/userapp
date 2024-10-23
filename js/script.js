$(document).ready(function () {
  // Função para carregar e exibir os usuários na tabela
  function loadUsers() {
    $.ajax({
      url: 'get_users.php', // Caminho para o script PHP que retorna os usuários
      method: 'GET',
      success: function (data) {
        let users = JSON.parse(data); // Converte JSON para objeto JavaScript
        let rows = '';

        users.forEach(user => {
          rows += `
                      <tr>
                          <td>${user.id}</td>
                          <td>${user.name}</td>
                          <td>${user.email}</td>
                          <td>${user.status}</td>
                          <td>${user.admission_date}</td>
                          <td>${user.created_at}</td>
                          <td>${user.updated_at}</td>
                      </tr>
                  `;
        });

        $('#user-table tbody').html(rows); // Atualiza o conteúdo da tabela
      },
      error: function (xhr, status, error) {
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  // Carrega os usuários inicialmente ao abrir a página
  loadUsers();

  // Botão "Adicionar Usuário" - Abre um modal SweetAlert2 para adicionar um novo usuário
  $('#add-user').click(function () {
    Swal.fire({
      title: 'Adicionar Usuário',
      html: `
              <input type="text" id="name" class="swal2-input" placeholder="Nome">
              <input type="email" id="email" class="swal2-input" placeholder="Email">
              <input type="text" id="status" class="swal2-input" placeholder="Situação">
              <input type="date" id="admission_date" class="swal2-input" placeholder="Data de Admissão">
          `,
      confirmButtonText: 'Salvar',
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value;
        const email = Swal.getPopup().querySelector('#email').value;
        const status = Swal.getPopup().querySelector('#status').value;
        const admission_date = Swal.getPopup().querySelector('#admission_date').value;

        if (!name || !email || !status || !admission_date) {
          Swal.showValidationMessage(`Preencha todos os campos`);
          return false;
        }

        return { name, email, status, admission_date };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: '../add_user.php', // Caminho para o script PHP que adiciona usuários
          method: 'POST',
          data: result.value,
          success: function (response) {
            let res = JSON.parse(response);

            if (res.success) {
              Swal.fire('Sucesso!', 'Usuário adicionado com sucesso!', 'success');
              loadUsers(); // Atualiza a lista de usuários
            } else if (res.error) {
              Swal.fire('Erro!', res.error, 'error');
            }
          },
          error: function (xhr, status, error) {
            console.error('Erro ao adicionar usuário:', error);
            Swal.fire('Erro!', 'Não foi possível adicionar o usuário.', 'error');
          }
        });
      }
    });
  });

  // Atualiza a tabela de usuários a cada 5 segundos
  setInterval(loadUsers, 5000);
});
