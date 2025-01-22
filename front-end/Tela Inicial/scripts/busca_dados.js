const mostraSaldo = document.querySelector('#mostraSaldo p');

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
    linhas.forEach(function(linha) {
      if (linha.classList.contains('selectedgreen')) {
        linha.classList.remove('selectedgreen');
        linha.classList.add('linegreen');
      } else if (linha.classList.contains('selectedred')) {
        linha.classList.remove('selectedred');
        linha.classList.add('linered');
      }
    });
    localStorage.removeItem('selectedRowId');
  }
});

async function retornoDadosLista(data) {
  const tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';

  console.log(data);

  data.forEach((item) => {
    const row = document.createElement('tr');
    row.dataset.id = item.id;

    item.tipo === 'Receitas' ? row.classList.add('linegreen') : row.classList.add('linered');

    row.innerHTML = `
        <td>${item.tipo}</td>
        <td>${item.descricao}</td>
        <td>${item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        <td>${item.meioPagamento}</td>
        <td>${new Date(item.dtcadastro).toLocaleString('pt-BR')}</td>
    `;

    row.addEventListener('click', function(event) {
      event.stopPropagation();

      if (this.classList.contains('linegreen')) {
        this.classList.add('selectedgreen');
        this.classList.remove('linegreen');
      } 
      
      if (this.classList.contains('linered')) {
        this.classList.add('selectedred');
        this.classList.remove('linered');
      }

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
    window.location.href = '../../Login/index.html'
  } else if (!isValid) {
    logoutUser();
  } else {
    localStorage.removeItem('selectedRowId');
    localStorage.removeItem('idCartao');
    carregarDados();
    carregarSaldo();
    somaDespesas();
    somaReceitas();
    setupAutoLogout();
  }

};