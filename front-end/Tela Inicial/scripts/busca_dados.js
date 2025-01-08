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

document.addEventListener('click', function(event) {
  const tabela = document.querySelector('table');
  const linhas = tabela.querySelectorAll('tr');

  const acoes = [
    document.querySelector('#editarReceita'),
    document.querySelector('#editarDespesa'),
  ];

  let clicouNaLinha = false;
  let clicouNaAcao = acoes.some(acao => acao.contains(event.target));

  linhas.forEach(function(linha) {
    if (linha.contains(event.target)) {
      clicouNaLinha = true;
    }
  });

  if (!clicouNaLinha && !clicouNaAcao) {
    localStorage.removeItem('selectedRowId');
  }
});

async function retornoDadosLista(data) {
  const tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';

  data.forEach((item) => {
    const row = document.createElement('tr');
    row.dataset.id = item.id;

    row.innerHTML = `
        <td>${new Date(item.dtcadastro).toLocaleString('pt-BR')}</td>
        <td>${item.descricao}</td>
        <td>${item.tipo}</td>
        <td>${item.meioPagamento}</td>
        <td>${item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
    `;

    row.addEventListener('click', function(event) {

      event.stopPropagation();

      const rows = tableBody.getElementsByTagName('tr');
      for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove('selected');
      }
      this.classList.add('selected');

      localStorage.setItem('selectedRowId', this.dataset.id);
    });

    tableBody.appendChild(row);
  });
}

document.addEventListener('click', function() {
  const rows = document.querySelectorAll('#dataTable tbody tr');
  rows.forEach(row => row.classList.remove('selected'));

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
    localStorage.removeItem('selectedRowId');
    carregarDados();
    carregarSaldo();
    somaDespesas();
    somaReceitas();
    setupAutoLogout();
  }

};