const excluirReceita = document.getElementById('excluirReceita');
const excluirDespesa = document.getElementById('excluirDespesa');
const modal = document.getElementById('confirmationModal');
const span = document.getElementsByClassName('close')[0];
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');

document.addEventListener('DOMContentLoaded', async () => {
  excluirReceita.addEventListener('click', async (event) => {
    event.stopPropagation();

    try {

      let entrada = await buscaDadosEntrada();

      if (!entrada) {
        alert('Selecione uma receita para exclusão.');
        return;
      }

      confirmDelete.onclick = async () => {
        await deletarReceita()
        modal.style.display = 'none';
        await buscaDadosEntrada();
        alert('Receita excluída com sucesso!');
      }

      modal.style.display = 'block';
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      alert('Ocorreu um erro ao tentar buscar os dados. Por favor, tente novamente.');
    }
  });

  excluirDespesa.addEventListener('click', async (event) => {
    event.stopPropagation();

    try {

      let saida = await buscaDadosSaida();

      if (!saida) {
        alert('Selecione uma despesa para exclusão.');
        return;
      }

      confirmDelete.onclick = async () => {
        await deletarDespesa()
        modal.style.display = 'none';
        await buscaDadosEntrada();
        alert('Despesa excluída com sucesso!');
      }

      modal.style.display = 'block';
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      alert('Ocorreu um erro ao tentar buscar os dados. Por favor, tente novamente.');
    }
  });

  span.onclick = () => {
    modal.style.display = 'none';
  }

  cancelDelete.onclick = () => {
    modal.style.display = 'none';
  }

});