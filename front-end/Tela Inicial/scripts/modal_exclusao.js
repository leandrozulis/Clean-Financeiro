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
        exibeError('Registro não encontrado!');
        return
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
      exibeError(error.message);
    }
  });

  excluirDespesa.addEventListener('click', async (event) => {
    event.stopPropagation();

    try {

      let saida = await buscaDadosSaida();

      if (!saida) {
        exibeError('Registro não encontrado!');
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
      exibeError(error.message);
    }
  });

  span.onclick = () => {
    modal.style.display = 'none';
  }

  cancelDelete.onclick = () => {
    modal.style.display = 'none';
  }

});