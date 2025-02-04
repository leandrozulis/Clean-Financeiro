const openModalRendaFixa = document.getElementById('openModalRendaFixa');
const rendaFixaModal = document.getElementById('rendaFixaModal');
const closeModalRendaFixa = document.getElementById('closeModalRendaFixa');
const filterDate = document.getElementById('filterDate');
const rendaFixaTableBody = document.getElementById('rendaFixaTable').getElementsByTagName('tbody')[0];
const excluirRendaFixa = document.getElementById('excluirRendaFixa');

let rendasFixas = []; // Array para armazenar as rendas fixas

openModalRendaFixa.addEventListener('click', async () => {
  const renda = await buscaDadosRendasFixas();
  renderRendasFixas(renda);
  rendaFixaModal.style.display = 'block';
});

// Função para renderizar as rendas fixas na tabela
function renderRendasFixas(rendasFixas) {
    rendaFixaTableBody.innerHTML = '';
    rendasFixas.forEach(rendaFixa => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="checkbox" name="rendaFixaCheckbox" value="${rendaFixa.id}"></td>
        <td>${rendaFixa.valor.toFixed(2)}</td>
        <td>${new Date(rendaFixa.dtcadastro).toLocaleDateString()}</td>
      `;
      rendaFixaTableBody.appendChild(row);
    });

    // Adiciona evento para permitir apenas um checkbox selecionado por vez
    const checkboxes = document.getElementsByName('rendaFixaCheckbox');
    
    checkboxes.forEach(checkbox => {
      console.log(checkbox);
      checkbox.addEventListener('change', function() {
        checkboxes.forEach(cb => {
          if (cb !== this) {
            cb.checked = false
          };
        });
        localStorage.setItem('rendaFixaId', checkbox.value)
      });
    });
}

// Evento para fechar o modal
closeModalRendaFixa.addEventListener('click', () => {
    localStorage.removeItem('rendaFixaId')
    rendaFixaModal.style.display = 'none';
});

// Evento para fechar o modal ao clicar fora dele
window.addEventListener('click', (event) => {
  if (event.target === rendaFixaModal) {
    localStorage.removeItem('rendaFixaId')
    rendaFixaModal.style.display = 'none';
  }
});

// Evento para confirmar a seleção da renda fixa
excluirRendaFixa.addEventListener('click', async () => {
  const excluirRendaFixa = await DeletarRendaFixa()

  if (excluirRendaFixa) {
    exibeSucesso('Renda Fixa deletada com sucesso!').then(() => {
      window.location.href = '../../Tela Inicial/Inicio/tela_inicial.html';
    })
  } else {
    exibeError('Erro ao deletar Renda Fixa.');
  }
});