const descricao = document.getElementById('descricao');
const meioPagamento = document.getElementById('meioPagamento');
const valor = document.getElementById('valor');

document.getElementById('profileForm').addEventListener('submit', async (e) => {

  e.preventDefault();

  if (valor.value <= 0 ) {
    exibeError('O valor informado deve ser maior que 0.');
    return;
  }

  const entrada = await atualizarReceita();

  if (entrada) {
    exibeSucesso('Receita atualizada com sucesso!').then(() => {
      localStorage.removeItem('selectedRowId');
      window.location.href = './tela_inicial.html';
    });
  } else {
    exibeError('Erro ao atualizar receita.');
  }
});

async function atualizarReceita() {
  try {

    const response = await fetch(`http://localhost:2578/atualiza/entrada/${localStorage.getItem('selectedRowId')}?token=${localStorage.getItem('tokenConta')}`, {
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
    exibeError('Erro ao conectar ao servidor.');
  }
}

let data = '';

async function carregarEntrada() {
  const entrada = await buscaDadosEntrada();

  if (entrada === undefined) {
    exibeError('Receita não encontrada.').then(() => {
      window.location.href = './tela_inicial.html';
      return;
    });
  }

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