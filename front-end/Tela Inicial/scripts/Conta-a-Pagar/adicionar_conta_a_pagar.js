const valorParcela = document.getElementById('valorParcela');
const descricaoContaAPagar = document.getElementById('descricaoContaAPagar');
const parcelas = document.getElementById('parcelas');
const adicionarContaAPagar = document.getElementById('adicionarContaAPagar')

adicionarContaAPagar.addEventListener('click', async (e) => {

  e.preventDefault();  

  if (valorParcela.value <= 0 ) {
    exibeError('O valor informado deve ser maior que 0.');
    return;
  }

  const contaApagar = await registrarContaAPagar();
  if (contaApagar) {
    exibeSucesso('Cartão criado com sucesso!').then(() => {
      window.location.href = '../Conta_a_pagar/contas_a_pagar.html';
    })
  } else {
    exibeError('Erro ao criar Conta a Pagar!');
  }
});

async function registrarContaAPagar() {

  try {
    const response = await fetch(`http://localhost:2578/register/contaapagar?token=${localStorage.getItem('tokenConta')}&cartaoId=${localStorage.getItem('idCartao')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "valor": Number(valorParcela.value),
        "descricao": descricaoContaAPagar.value,
        "parcelas": parcelas.value
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.contaAPagar;
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