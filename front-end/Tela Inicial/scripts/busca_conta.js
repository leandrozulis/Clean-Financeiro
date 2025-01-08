async function buscaDadosConta() {
  try {
    const response = await fetch(`http://localhost:2578/find/profile?token=${localStorage.getItem('tokenConta')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.conta;
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro ao conectar ao servidor.');
  }
}