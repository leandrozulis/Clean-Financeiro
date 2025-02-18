async function buscaDadosSaidas() {
  try {
    const response = await fetch(`http://localhost:2578/find/saidas?token=${localStorage.getItem('tokenConta')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.saida.map(item => ({ ...item, tipo: 'Despesas' }));
    }
  } catch (err) {
    ExibeError(err.message);
  }
}

async function carregarDados() {
  const saidas = await buscaDadosSaidas();

  const todosDados = [...saidas];

  todosDados.sort((a, b) => new Date(a.dtcadastro) - new Date(b.dtcadastro));

  retornoDadosLista(todosDados);
}

async function retornoDadosLista(data) {
  const tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';

  data.forEach((item) => {
    const row = document.createElement('tr');
    row.dataset.id = item.id;

    row.classList.add('linered');

    row.innerHTML = `
      <td>${item.tipo}</td>
      <td>${item.descricao}</td>
      <td>${item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
      <td>${item.meioPagamento}</td>
      <td>${new Date(item.dtcadastro).toLocaleString('pt-BR')}</td>
    `;

    tableBody.appendChild(row);
  });
}

window.onload = function () {

  const isValid = isTokenValid();

  if (isValid === null) {
    window.location.href = '../../../Login/index.html'
  } else if (!isValid) {
    logoutUser();
  } else {
    localStorage.removeItem('selectedRowId');
    carregarDados();
    somaDespesas();
    setupAutoLogout();
  }

};