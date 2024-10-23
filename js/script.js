$(document).ready(function () {
  // Função para carregar usuários
  function loadUsers() {
    $.ajax({
      url: '../get_users.php',
      method: 'GET',
      success: function (data) {
        let users = JSON.parse(data);
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
                <button class="btn btn-warning btn-sm me-1 edit-user" data-id="${user.id}">
                    <i class="bi bi-pencil-square"></i> Editar
                </button>
                <button class="btn btn-danger btn-sm delete-user" data-id="${user.id}">
                    <i class="bi bi-trash"></i> Excluir
                </button>
            </td>
        </tr>
    `;
        });
        $('#user-table tbody').html(rows);
      }
    });
  }
  function showToast(message, icon = 'success') {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      icon: icon,
      title: message
    });
  }
  // Carregar usuários inicialmente
  loadUsers();

  // Adicionar novo usuário via AJAX
  $('#add-user').click(function () {
    $('#userModal').modal('show');
  });

  $('#user-form').submit(function (e) {
    e.preventDefault();

    const data = {
      name: $('#name').val(),
      email: $('#email').val(),
      status: $('#status').val(),
      admission_date: $('#admission_date').val()
    };

    $.ajax({
      url: '../add_user.php',
      method: 'POST',
      data: data,
      success: function (response) {
        $('#userModal').modal('hide');
        showToast('Usuário adicionado com sucesso!');
        loadUsers();
      }
    });
  });

  $(document).on('click', '.delete-user', function () {
    const userId = $(this).data('id');

    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: '../delete_user.php',
          method: 'POST',
          data: { id: userId },
          success: function (response) {
            showToast('Usuário excluído com sucesso!');
            loadUsers();
          }
        });
      }
    });
  });


  // Atualizar tabela automaticamente a cada 5 segundos
  setInterval(loadUsers, 5000);
});
