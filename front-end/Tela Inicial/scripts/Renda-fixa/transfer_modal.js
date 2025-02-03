document.addEventListener('DOMContentLoaded', async function() {
  const openTransferModal = document.getElementById('openTransferModal');
  const transferModal = document.getElementById('transferModal');
  const submitTransfer = document.getElementById('submitTransfer');
  const currentAccountValue = document.getElementById('currentAccountValue');
  const transferValueInput = document.getElementById('transferValue');

  const accountValue = await buscaDadosConta();
  currentAccountValue.textContent = accountValue.saldo.toFixed(2);

  openTransferModal.onclick = function(e) {
    e.stopPropagation();
    transferModal.style.display = 'block';
    transferValueInput.focus();
  };

  window.onclick = function(event) {
    if (event.target === transferModal) {
      transferModal.style.display = 'none';
    }
  };

  submitTransfer.onclick = function() {
    const transferValue = parseFloat(transferValueInput.value);
    if (transferValue && transferValue > 0 && transferValue <= accountValue) {
      alert(`Transferência de R$ ${transferValue.toFixed(2)} realizada com sucesso!`);
      transferModal.style.display = 'none';
    } else {
      alert('Valor inválido para transferência.');
    }
  }
});