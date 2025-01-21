const editarDespesa = document.getElementById('editarDespesa');

const descricao = document.getElementById('descricao');
const meioPagamento = document.getElementById('meioPagamento');
const valor = document.getElementById('valor');

document.getElementById('profileFormDespesa').addEventListener('submit', async (e) => {

  e.preventDefault();

  let saida = await atualizarDespesa();

  if (saida) {
    exibeSucesso('Despesa atualizada com sucesso!').then(() => {
      localStorage.removeItem('selectedRowId');
      window.location.href = '../../Tela Inicial/Inicio/tela_inicial.html';
    });
  }
});

async function atualizarDespesa() {
  try {

    const response = await fetch(`http://localhost:2578/atualiza/saida/${localStorage.getItem('selectedRowId')}?token=${localStorage.getItem('tokenConta')}`, {
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

    if (response.status === 400) {
      let res = await response.json()
      exibeError(res.message);
    }
    
    if (response.ok) {
      const data = await response.json();
      return data.saida;
    }
  } catch (err) {
    exibeError(err.message);
  }
}

let data = '';

async function carregarSaida() {
  const saida = await buscaDadosSaida();

  if (saida === undefined) {
    exibeError('Despesa não encontrada.').then(() => {
      window.location.href = './tela_inicial.html';
      return;
    });
  }

  data = saida.dtcadastro;
  
  document.getElementById('descricao').value = saida.descricao;
  document.getElementById('meioPagamento').value = saida.meioPagamento;
  document.getElementById('valor').value = saida.valor;
}

window.onload = function () {

  const isValid = isTokenValid();

  if (isValid === null) {
    window.location.href = '../Login/index.html'
  } else if (!isValid) {
    logoutUser();
  } else {
    carregarSaida();
    setupAutoLogout();
  }

};