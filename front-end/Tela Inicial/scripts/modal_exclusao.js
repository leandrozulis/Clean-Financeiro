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
        exibeError('Selecione uma receita para exclusão.');
        return;
      }

      confirmDelete.onclick = async () => {
        await deletarReceita()
        exibeSucesso('Receita excluída com sucesso!').then(async () => {
          modal.style.display = 'none';
          await buscaDadosEntrada();
        });
      }

      modal.style.display = 'block';
    } catch (error) {
      exibeError('Ocorreu um erro ao tentar buscar os dados. Por favor, tente novamente.');
    }
  });

  excluirDespesa.addEventListener('click', async (event) => {
    event.stopPropagation();

    try {

      let saida = await buscaDadosSaida();

      if (!saida) {
        exibeError('Selecione uma despesa para exclusão.');
        return;
      }

      confirmDelete.onclick = async () => {
        await deletarDespesa()
        exibeSucesso('Despesa excluída com sucesso!').then(async () => {
          modal.style.display = 'none';
          await buscaDadosEntrada();
        });
      }

      modal.style.display = 'block';
    } catch (error) {
      exibeError('Ocorreu um erro ao tentar buscar os dados. Por favor, tente novamente.');
    }
  });

  span.onclick = () => {
    modal.style.display = 'none';
  }

  cancelDelete.onclick = () => {
    modal.style.display = 'none';
  }

});