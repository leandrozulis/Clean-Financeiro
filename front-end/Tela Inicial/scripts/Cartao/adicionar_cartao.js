const limiteCredito = document.getElementById('limiteCredito');
const nomeCartao = document.getElementById('nomeCartao');
const nomeBanco = document.getElementById('nomeBanco');
const diaFechamento = document.getElementById('diaFechamento');
const diaVencimento = document.getElementById('diaVencimento');
const adicionarCartao = document.getElementById('adicionarCartao')

adicionarCartao.addEventListener('click', async (e) => {

  e.preventDefault();  

  if (limiteCredito.value <= 0 ) {
    exibeError('O valor informado deve ser maior que 0.');
    return;
  }

  const cartao = await registrarCartao();
  if (cartao) {
    exibeSucesso('Cartão criado com sucesso!').then(() => {
      window.location.href = './tela_inicial.html';
    })
  } else {
    exibeError('Erro ao criar cartão');
  }
});

async function registrarCartao() {

  try {
    const response = await fetch(`http://localhost:2578/register/cartao?token=${localStorage.getItem('tokenConta')}`, {
      method: 'POST',
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

window.onload = function () {

  const isValid = isTokenValid();

  if (isValid === null) {
    window.location.href = '../../../Login/index.html'
  } else if (!isValid) {
    logoutUser();
  } else {
    setupAutoLogout();
  }

};