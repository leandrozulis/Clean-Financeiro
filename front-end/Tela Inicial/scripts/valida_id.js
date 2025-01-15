document.addEventListener('DOMContentLoaded', function() {
  const editarReceita = document.getElementById('editarReceita');
  const editarDespesa = document.getElementById('editarDespesa');

  if (editarReceita) {
    editarReceita.addEventListener('click', function(e) {
      e.preventDefault();

      const selectedRowId = localStorage.getItem('selectedRowId'); // Lê o valor mais recente

      if (!selectedRowId) {
        exibeAtencao('Selecione uma receita para editar.');
      } else {
        window.location.href = './editar_receita.html';
      }
    });
  }

  if (editarDespesa) {
    editarDespesa.addEventListener('click', function(e) {
      e.preventDefault();

      const selectedRowId = localStorage.getItem('selectedRowId'); // Lê o valor mais recente

      if (!selectedRowId) {
        exibeAtencao('Selecione uma despesa para editar.');
      } else {
        window.location.href = './editar_despesa.html';
      }
    });
  }
});