const mostraDespesa = document.querySelector('#mostraDespesa p');

async function somaDespesas() {
  const saidas = await buscaDadosSaidas();
  const total = saidas.reduce((acc, item) => acc + item.valor, 0);

  mostraDespesa.innerHTML = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}