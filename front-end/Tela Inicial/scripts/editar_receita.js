const selectedRowId = localStorage.getItem('selectedRowId');
const editarReceita = document.getElementById('editarReceita');

const descricao = document.getElementById('descricao');
const meioPagamento = document.getElementById('meioPagamento');
const valor = document.getElementById('valor');

editarReceita.addEventListener('click', async (e) => {

  e.preventDefault();

  const entrada = await atualizarReceita();
  if (entrada) {
    alert('Receita atualizada com sucesso!');
    window.location.href = './tela_inicial.html';
  } else {
    alert('Erro ao atualizar receita.');
  }
});

async function atualizarReceita() {
  try {
    const response = await fetch(`http://localhost:2578/atualiza/entrada/${selectedRowId}?token=${localStorage.getItem('tokenConta')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "valor": Number(valor.value),
        "descricao": descricao.value,
        "meioPagamento": meioPagamento.value,
        "dtcadastro": data
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.entrada;
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro ao conectar ao servidor.');
  }
}


async function buscaDadosEntrada() {
  try {
    const response = await fetch(`http://localhost:2578/entrada/${selectedRowId}?token=${localStorage.getItem('tokenConta')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.entrada;
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro ao conectar ao servidor.');
  }
}

let data = '';

async function carregarEntrada() {
  const entrada = await buscaDadosEntrada();

  data = entrada.dtcadastro;
  

  document.getElementById('descricao').value = entrada.descricao;
  document.getElementById('meioPagamento').value = entrada.meioPagamento;
  document.getElementById('valor').value = entrada.valor;
}

window.onload = function () {

  const isValid = isTokenValid();

  if (isValid === null) {
    window.location.href = '../Login/index.html'
  } else if (!isValid) {
    logoutUser();
  } else {
    carregarEntrada();
    setupAutoLogout();
  }

};