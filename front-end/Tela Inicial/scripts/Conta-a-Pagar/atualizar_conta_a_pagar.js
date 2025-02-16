const valor = document.getElementById('valorParcelaAtualizada')
const descricao = document.getElementById('descricaoContaAPagarAtualizada')
const parcelas = document.getElementById('parcelasAtualizada')
const btnAtualiza = document.getElementById('AtualizarContaAPagar')

btnAtualiza.addEventListener('click', async (e) => {
  e.preventDefault()

  const conta = await updateContaAPagar()

  if (conta) {
    exibeSucesso('Registro atualizado com sucesso!').then(() => {
      localStorage.removeItem('registroIdConta');
      window.location.href = '../Conta_a_pagar/contas_a_pagar.html';
    });
  }
})

async function updateContaAPagar() {
  try {
    const response = await fetch(`http://localhost:2578/atualizar/contaapagar?token=${localStorage.getItem('tokenConta')}&cartaoId=${localStorage.getItem('idCartao')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "contaapagarId": localStorage.getItem('contaapagarId'),
        "valor": Number(valor.value),
        "descricao": descricao.value,
        "parcelas": parcelas.value
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.contaApagar;
    }
  } catch (err) {
    return exibeError(err.message);
  }
}

let data = '';

async function carregarContaAPagar() {
  const conta = await buscaDadosContaAPagar();  

  if (conta === undefined) {
    exibeError('Registro não encontrado.').then(() => {
      window.location.href = '../Conta_a_pagar/contas_a_pagar.html';
      return;
    });
  }

  document.getElementById('valorParcelaAtualizada').value = conta.valor;
  document.getElementById('descricaoContaAPagarAtualizada').value = conta.descricao;
  document.getElementById('parcelasAtualizada').value = conta.parcelas;
}

window.onload = function () {

  const isValid = isTokenValid();

  if (isValid === null) {
    window.location.href = '../../../Login/index.html'
  } else if (!isValid) {
    logoutUser();
  } else {
    carregarContaAPagar();
    setupAutoLogout();
  }

};