async function deletarDespesa() {
  try {
    const response = await fetch(`http://localhost:2578/delete/saida?token=${localStorage.getItem('tokenConta')}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "saidaId": localStorage.getItem('selectedRowId'),
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.saida;
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro ao conectar ao servidor.');
  }
}