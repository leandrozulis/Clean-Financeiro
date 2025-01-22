const email = document.getElementById('email');
const nome = document.getElementById('nome');
const saldo = document.getElementById('saldo');
const token = document.getElementById('token');

async function carregarConta() {
  const {email, nome, saldo, token} = await buscaDadosConta(); 

  document.getElementById('email').value = email;
  document.getElementById('nome').value = nome;
  document.getElementById('saldo').value = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.getElementById('token').value = token;
}

window.onload = function () {

  const isValid = isTokenValid();

  if (isValid === null) {
    window.location.href = '../../../Login/index.html'
  } else if (!isValid) {
    logoutUser();
  } else {
    carregarConta()
    setupAutoLogout();
  }

};