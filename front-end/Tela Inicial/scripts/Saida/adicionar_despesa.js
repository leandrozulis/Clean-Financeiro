const descricao = document.getElementById('descricao');
const meioPagamento = document.getElementById('meioPagamento');
const valor = document.getElementById('valor');
const adicionarDespesa = document.getElementById('adicionarDespesa');

adicionarDespesa.addEventListener('click', async (e) => {

  e.preventDefault();

  if (valor.value <= 0 ) {
    exibeError('O valor informado deve ser maior que 0.');
    return;
  }

  const saida = await registrarDespesa();
  if (saida) {
    exibeSucesso('Despesa adicionada com sucesso!').then(() => {
      window.location.href = '../../Tela Inicial/Inicio/tela_inicial.html';
    });
  } else {
    exibeError('A conta não contem valor para Saque!');
  }
});

async function registrarDespesa() {
  try {

    const response = await fetch(`http://localhost:2578/register/saida?token=${localStorage.getItem('tokenConta')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "valor": Number(valor.value),
        "descricao": descricao.value,
        "meioPagamento": meioPagamento.value
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.saida;
    }
  } catch (err) {
    exibeError('Erro ao conectar ao servidor.');
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