async function deletarReceita() {
  try {
    const response = await fetch(`http://localhost:2578/delete/entrada?token=${localStorage.getItem('tokenConta')}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "entradaId": localStorage.getItem('selectedRowId'),
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.entrada;
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro ao conectar ao servidor.');
  }
}