const limiteCredito = document.getElementById('limiteCredito');
const nomeCartao = document.getElementById('nomeCartao');
const nomeBanco = document.getElementById('nomeBanco');
const diaFechamento = document.getElementById('diaFechamento');
const diaVencimento = document.getElementById('diaVencimento');
const editarCartao = document.getElementById('editarCartao')

editarCartao.addEventListener('click', async (e) => {

  e.preventDefault();  

  if (limiteCredito.value <= 0 ) {
    exibeError('O valor informado deve ser maior que 0.');
    return;
  }

  const cartao = await editaCartao();
  if (cartao) {
    exibeSucesso('Cartão editado com sucesso!').then(() => {
      window.location.href = '../Cartao/consulta_todos_cartoes.html';
    })
  } else {
    exibeError('Erro ao editar cartão');
  }
});

async function editaCartao() {

  try {
    const response = await fetch(`http://localhost:2578/atualiza/cartao/${localStorage.getItem('idCartao')}?token=${localStorage.getItem('tokenConta')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "limite": Number(limiteCredito.value),
        "descricao": nomeCartao.value,
        "nomeBanco": nomeBanco.value,
        "dtfechamento": diaFechamento.value,
        "dtvencimento": diaVencimento.value
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.cartao;
    }
  } catch (err) {
    exibeError(err.message);
  }
}

async function carregarCartao() {
  const cartao = await buscaDadosCartao();

  if (cartao === undefined) {
    exibeError('Cartão não encontrado.').then(() => {
      window.location.href = '../../Tela Inicial/Inicio/tela_inicial.html';
      return;
    });
  }

  data = cartao.dtcadastro;
  

  document.getElementById('limiteCredito').value = cartao.limite;
  document.getElementById('nomeCartao').value = cartao.descricao;
  document.getElementById('nomeBanco').value = cartao.nomeBanco;
  document.getElementById('diaFechamento').value = cartao.dtfechamento;
  document.getElementById('diaVencimento').value = cartao.dtvencimento;
}

window.onload = function () {

  const isValid = isTokenValid();

  if (isValid === null) {
    window.location.href = '../../../Login/index.html'
  } else if (!isValid) {
    logoutUser();
  } else {
    carregarCartao();
    setupAutoLogout();
  }

};