const mostraRendaFixa = document.querySelector('#mostraRendaFixa p');

async function somaRendaFixas() {
  const rendaFixas = await buscaDadosRendasFixas();
  const total = rendaFixas.reduce((acc, item) => acc + item.valor, 0);  

  mostraRendaFixa.innerHTML = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}