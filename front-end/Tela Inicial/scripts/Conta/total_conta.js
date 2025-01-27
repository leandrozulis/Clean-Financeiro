const mostraSaldo = document.querySelector('#mostraSaldo p');

async function carregarSaldo() {
  const conta = await buscaDadosConta();
  mostraSaldo.innerHTML = conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}