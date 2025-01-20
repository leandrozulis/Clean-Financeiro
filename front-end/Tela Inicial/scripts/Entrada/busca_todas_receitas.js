async function buscaDadosEntradas() {
  try {
    const response = await fetch(`http://localhost:2578/find/entradas?token=${localStorage.getItem('tokenConta')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.entrada.map(item => ({ ...item, tipo: 'Receitas' }));
    }
  } catch (err) {
    ExibeError(err.message);
  }
}

async function carregarDados() {
  const entradas = await buscaDadosEntradas();

  const todosDados = [...entradas];

  todosDados.sort((a, b) => new Date(a.dtcadastro) - new Date(b.dtcadastro));

  retornoDadosLista(todosDados);
}

async function retornoDadosLista(data) {
  const tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';

  data.forEach((item) => {
    const row = document.createElement('tr');
    row.dataset.id = item.id;

    row.classList.add('linegreen');

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
    window.location.href = '../Login/index.html'
  } else if (!isValid) {
    logoutUser();
  } else {
    localStorage.removeItem('selectedRowId');
    carregarDados();
    somaReceitas();
    setupAutoLogout();
  }

};