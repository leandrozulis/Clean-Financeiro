const excluirCartao = document.getElementById('excluirCartao');
const modal = document.getElementById('confirmationModal');
const span = document.getElementsByClassName('close')[0];
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');

document.addEventListener('DOMContentLoaded', async () => {
  excluirCartao.addEventListener('click', async (event) => {
    event.stopPropagation();

    try {

      let cartao = await buscaDadosCartao();

      if (!cartao) {
        exibeError('Registro não encontrado!');
        return;
      }

      confirmDelete.onclick = async () => {
        await deletarCartao()
        exibeSucesso('Cartão excluído com sucesso!').then(async () => {
          modal.style.display = 'none';
          window.location.href = '../Cartao/consulta_todos_cartoes.html'
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
    modal.style.display = 'none';
  }

});