function loadUsers() {
  $.ajax({
    url: 'get_users.php', // Caminho para o script PHP que retorna os usuários
    method: 'GET',
    success: function (data) {
      let users = data; // Converte JSON para objeto JavaScript
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
                        <td>
                          <button class="btn-edit" data-id="${user.id}">Editar</button>
                          <button class="btn-delete" data-id="${user.id}">Deletar</button>
                        </td>
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

function editUser(userId) {
  // Recupera os dados do usuário pelo ID e exibe no modal
  $.ajax({
    url: 'get_user.php', // Caminho para o script PHP que retorna dados do usuário
    method: 'GET',
    data: { id: userId },
    success: function (response) {
      let user = response;
      Swal.fire({
        title: 'Editar Usuário',
        html: `
          <input type="text" id="name" class="swal2-input" value="${user.name}" placeholder="Nome">
          <input type="email" id="email" class="swal2-input" value="${user.email}" placeholder="Email">
          <input type="text" id="status" class="swal2-input" value="${user.status}" placeholder="Situação">
          <input type="date" id="admission_date" class="swal2-input" value="${user.admission_date}" placeholder="Data de Admissão">
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

          return { id: userId, name, email, status, admission_date };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
            url: 'edit_user.php', // Caminho para o script PHP que edita usuários
            method: 'POST',
            data: result.value,
            success: function (response) {
              let res = response;

              if (res.success) {
                Swal.fire('Sucesso!', 'Usuário atualizado com sucesso!', 'success');
                loadUsers(); // Atualiza a lista de usuários
              } else {
                Swal.fire('Erro!', res.error, 'error');
              }
            },
            error: function (xhr, status, error) {
              console.error('Erro ao editar usuário:', error);
              Swal.fire('Erro!', 'Não foi possível editar o usuário.', 'error');
            }
          });
        }
      });
    },
    error: function (xhr, status, error) {
      console.error('Erro ao carregar dados do usuário:', error);
      Swal.fire('Erro!', 'Não foi possível carregar os dados do usuário.', 'error');
    }
  });
}

function deleteUser(userId) {
  Swal.fire({
    title: 'Tem certeza?',
    text: "Você não poderá reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, deletar!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: 'delete_user.php', // Caminho para o script PHP que deleta usuários
        method: 'POST',
        data: { id: userId },
        success: function (response) {
          let res = response;

          if (res.success) {
            Swal.fire('Sucesso!', 'Usuário deletado com sucesso!', 'success');
            loadUsers(); // Atualiza a lista de usuários
          } else {
            Swal.fire('Erro!', res.error, 'error');
          }
        },
        error: function (xhr, status, error) {
          console.error('Erro ao deletar usuário:', error);
          Swal.fire('Erro!', 'Não foi possível deletar o usuário.', 'error');
        }
      });
    }
  });
}

function addUser() {
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
        url: 'add_user.php', // Caminho para o script PHP que adiciona usuários
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
}

$(document).ready(function () {

  // Carrega os usuários inicialmente ao abrir a página
  loadUsers();

  // Atualiza a tabela de usuários a cada 5 segundos
  setInterval(loadUsers, 5000);
});

// Função para editar um usuário
$(document).on('click', '.btn-edit', function () {
  const userId = $(this).data('id');
  editUser(userId);
});

// Função para deletar um usuário
$(document).on('click', '.btn-delete', function () {
  const userId = $(this).data('id');
  deleteUser(userId);
});

// Função para adicionar um usuário
$(document).on('click', '#add-user', function () {
  addUser();
});
