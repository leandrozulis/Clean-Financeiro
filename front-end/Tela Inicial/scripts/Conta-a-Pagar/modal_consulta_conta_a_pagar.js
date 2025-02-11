const consultaContaAPagar = document.getElementById('consultaContaAPagar');
const contaAPagarModal = document.getElementById('contaAPagarModal');
const closeModalContaAPagar = document.getElementById('closeModalContaAPagar');
const filterDate = document.getElementById('filterDate');
const contaAPagarTableBody = document.getElementById('contaAPagarTable').getElementsByTagName('tbody')[0];
const quitarContaAPagar = document.getElementById('quitarContaAPagar');

consultaContaAPagar.addEventListener('click', async () => {
  const contaPagar = await buscaDadosContaAPagar();
  if (contaPagar) {
    renderContaApagar(contaPagar);
    contaAPagarModal.style.display = 'block';
  } else {
    alert('Erro ao buscar dados de contas a pagar.');
  }
});

let valorParcela;

// Função para renderizar a conta a pagar na tabela
function renderContaApagar(contaPagar) {
  contaAPagarTableBody.innerHTML = '';

  if (!contaPagar) {
    console.error('Dados inválidos:', contaPagar);
    return;
  }

  valorParcela = contaPagar.valor / contaPagar.parcelas;

  console.log(contaPagar);
  

  for (let i = 1; i <= contaPagar.parcelas; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="checkbox" name="contaAPagarCheckbox" value="${contaPagar.id}"></td>
      <td>${valorParcela.toFixed(3)}</td>
      <td>${contaPagar.descricao}</td>
      <td>${i}</td>
      <td>${new Date(contaPagar.dtcadastro).toLocaleDateString()}</td>
    `;
    contaAPagarTableBody.appendChild(row);
    localStorage.setItem('registroIdConta', contaPagar.id)
  }

  // Adiciona evento para permitir apenas um checkbox selecionado por vez
  const checkboxes = document.getElementsByName('contaAPagarCheckbox');
  
  checkboxes.forEach(checkbox => {

    console.log(checkbox);
    

    checkbox.addEventListener('change', function() {
      checkboxes.forEach(cb => {
        if (cb !== this) {
          cb.checked = false;
        }
      });
    });
  });
}

// Evento para fechar o modal
closeModalContaAPagar.addEventListener('click', () => {
    localStorage.removeItem('registroIdConta')
    localStorage.removeItem('contaapagarId')
    contaAPagarModal.style.display = 'none';
});

// Evento para fechar o modal ao clicar fora dele
window.addEventListener('click', (event) => {
  if (event.target === contaAPagarModal) {
    localStorage.removeItem('registroIdConta')
    localStorage.removeItem('contaapagarId')
    contaAPagarModal.style.display = 'none';
  }
});

// Evento para confirmar a seleção da renda fixa
quitarContaAPagar.addEventListener('click', async () => {
  const quitarContaAPagar = await quitarParcelaContaAPagar(valorParcela)

  if (quitarContaAPagar) {
    exibeSucesso('Parcela paga com sucesso!').then(() => {
      window.location.href = '../../Tela Inicial/Conta_a_pagar/contas_a_pagar.html';
      localStorage.removeItem('registroIdConta')
      localStorage.removeItem('contaapagarId')
    })
  }
});