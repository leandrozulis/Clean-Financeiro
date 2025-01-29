const mostraLimite = document.querySelector('#mostraLimite p')

async function carregarDados() {   

  // Limite
  const limiteCartao = await buscaDadosCartao()
  mostraLimite.innerHTML = limiteCartao.limite.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Lista
  const todosValores = await buscaDadosContasAPagar()  
  todosValores.sort((a, b) => new Date(a.dtcadastro) - new Date(b.dtcadastro));
  retornoDadosLista(todosValores);

}

async function retornoDadosLista(data) {
  const tableBody = document.querySelector('#dataTableContaAPagar tbody');
  tableBody.innerHTML = '';

  data.forEach((item) => {
    const row = document.createElement('tr');
    row.dataset.id = item.id;

    row.innerHTML = `
        <td>${item.descricao}</td>
        <td>${item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        <td>${item.parcelas}</td>
        <td>${new Date(item.dtcadastro).toLocaleString('pt-BR')}</td>
    `;

    row.addEventListener('click', (e) => {
      e.stopPropagation();
      localStorage.setItem('contaapagarId', row.dataset.id)
    })

    tableBody.appendChild(row);
  });
}

window.onload = function () {

  const isValid = isTokenValid();

  if (isValid === null) {
    window.location.href = '../../Login/index.html'
  } else if (!isValid) {
    logoutUser();
  } else {
    localStorage.removeItem('contaapagarId');
    carregarDados();
    somaContas();
    setupAutoLogout();
  }

};