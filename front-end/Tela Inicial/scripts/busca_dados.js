// const tableBody = document.querySelector('#dataTable tbody');
const mostraDespesa = document.querySelector('#mostraDespesa p');
const mostraReceita = document.querySelector('#mostraReceita p');
const mostraSaldo = document.querySelector('#mostraSaldo p');

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
    console.error('Erro na requisição:', err);
    alert('Erro ao conectar ao servidor.');
  }
}

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
    console.error('Erro na requisição:', err);
    alert('Erro ao conectar ao servidor.');
  }
}

async function carregarDados() {
  const entradas = await buscaDadosEntradas();
  const saidas = await buscaDadosSaidas();

  const todosDados = [...entradas, ...saidas];

  todosDados.sort((a, b) => new Date(a.dtcadastro) - new Date(b.dtcadastro));

  retornoDadosLista(todosDados);
}

async function retornoDadosLista(data) {
  const tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';

  data.forEach((item) => {
    const row = document.createElement('tr');
    row.dataset.id = item.id; // Adiciona o ID como um atributo de dados

    row.innerHTML = `
        <td>${new Date(item.dtcadastro).toLocaleString('pt-BR')}</td>
        <td>${item.descricao}</td>
        <td>${item.tipo}</td>
        <td>${item.meioPagamento}</td>
        <td>${item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    `;

    // Adiciona o evento de clique à linha
    row.addEventListener('click', function(event) {
      // Impede que o clique na linha propague para o documento
      event.stopPropagation();

      // Remove a classe 'selected' de todas as linhas
      const rows = tableBody.getElementsByTagName('tr');
      for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove('selected');
      }
      // Adiciona a classe 'selected' à linha clicada
      this.classList.add('selected');

      // Armazena o ID da linha selecionada no localStorage
      localStorage.setItem('selectedRowId', this.dataset.id);
    });

    tableBody.appendChild(row);
  });
}

// Adiciona um evento de clique ao documento para desselecionar as linhas
document.addEventListener('click', function() {
  const rows = document.querySelectorAll('#dataTable tbody tr');
  rows.forEach(row => row.classList.remove('selected'));

  // Remove a seleção de texto
  const selection = window.getSelection();
  selection.removeAllRanges();

});

async function carregarSaldo() {
  const conta = await buscaDadosConta();
  mostraSaldo.innerHTML = conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

window.onload = function () {

  const isValid = isTokenValid();

  if (isValid === null) {
    window.location.href = '../Login/index.html'
  } else if (!isValid) {
    logoutUser();
  } else {
    carregarDados();
    carregarSaldo();
    somaDespesas();
    somaReceitas();
    setupAutoLogout();
  }

};