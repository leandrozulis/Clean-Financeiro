const excluirContaAPagar = document.getElementById('excluirContaAPagar');
const modal = document.getElementById('confirmationModal');
const span = document.getElementsByClassName('close')[0];
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');

document.addEventListener('DOMContentLoaded', async () => {
  excluirContaAPagar.addEventListener('click', async (event) => {
    event.stopPropagation();

    try {

      let contaAPagar = await buscaDadosContaAPagar();

      if (!contaAPagar) {
        exibeError('Registro não encontrado!');
        return;
      }

      confirmDelete.onclick = async () => {
        await deletarContaAPagar()
        exibeSucesso('Conta a Pagar excluído com sucesso!').then(async () => {
          modal.style.display = 'none';
          window.location.href = '../Conta_a_pagar/contas_a_pagar.html'
        });
      }

      modal.style.display = 'block';
    } catch (error) {
      exibeError(error.message);
    }
  })

  span.onclick = () => {
    modal.style.display = 'none';
  }

  cancelDelete.onclick = () => {
    localStorage.removeItem('contaapagarId');
    modal.style.display = 'none';
  }

});