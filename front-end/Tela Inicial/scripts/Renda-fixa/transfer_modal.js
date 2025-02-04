const openTransferModal = document.getElementById('openTransferModal');
const transferModal = document.getElementById('transferModal');
const submitTransfer = document.getElementById('submitTransfer');
const currentAccountValue = document.getElementById('currentAccountValue');
const transferValueInput = document.getElementById('transferValue');
const closeModalTransfer = document.getElementById('closeModalTransfer');

document.addEventListener('DOMContentLoaded', async () => {
  const accountValue = await buscaDadosConta();
  currentAccountValue.textContent = accountValue.saldo.toFixed(2);

  openTransferModal.onclick = (e) => {
    e.stopPropagation();
    transferModal.style.display = 'block';
    setTimeout(() => transferValueInput.focus(), 100); // Adiciona um pequeno atraso para garantir o foco
  };

  window.onclick = (event) => {
    if (event.target === transferModal) {
      transferModal.style.display = 'none';
    }
  };

  closeModalTransfer.onclick = () => {
    transferModal.style.display = 'none';
  };

  submitTransfer.onclick = async () => {
    const transferValue = parseFloat(transferValueInput.value);
    const registra = await registraRendaFixa(transferValue)

    if (registra) {
      exibeSucesso('Renda Fixa adicionada com sucesso!').then(() => {
        window.location.href = '../../Tela Inicial/Inicio/tela_inicial.html';
      })
    } else {
      exibeError('Erro ao registrar Renda Fixa.');
    }
  };
});