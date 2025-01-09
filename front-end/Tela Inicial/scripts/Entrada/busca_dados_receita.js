async function buscaDadosEntrada() {
  try {
    const response = await fetch(`http://localhost:2578/entrada/${localStorage.getItem('selectedRowId')}?token=${localStorage.getItem('tokenConta')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.status === 400) {
      window.location.href = './tela_inicial.html';
      return null;
    }

    if (response.ok) {
      const data = await response.json();
      return data.entrada;
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro ao conectar ao servidor.');
  }
}