const mostraReceita = document.querySelector('#mostraReceita p');

async function somaReceitas() {
  const entradas = await buscaDadosEntradas();
  const total = entradas.reduce((acc, item) => acc + item.valor, 0);  

  mostraReceita.innerHTML = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}