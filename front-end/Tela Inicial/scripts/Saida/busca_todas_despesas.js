async function buscaDadosSaidas() {
  try {
    const response = await fetch(`http://localhost:2578/find/saidas?token=${localStorage.getItem('tokenConta')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.saida.map(item => ({ ...item, tipo: 'Despesas' }));
    }
  } catch (err) {
    ExibeError(err.message);
  }
}