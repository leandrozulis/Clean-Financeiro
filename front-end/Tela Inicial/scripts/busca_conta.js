async function buscaDadosConta() {
  try {
    const response = await fetch(`http://localhost:2578/find/profile?token=784faf47-6ef0-4bef-9d0b-7a28558067d6`, {
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