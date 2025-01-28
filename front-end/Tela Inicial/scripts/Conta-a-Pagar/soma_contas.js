const mostraValorAPagar = document.querySelector('#mostraValorAPagar p');

async function somaContas() {
  const value = await buscaDadosContasAPagar();
  const total = value.reduce((acc, item) => acc + item.valor, 0);  

  mostraValorAPagar.innerHTML = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}