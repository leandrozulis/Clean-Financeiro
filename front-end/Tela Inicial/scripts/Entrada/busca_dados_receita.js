async function buscaDadosEntrada() {
  try {
    const response = await fetch(`http://localhost:2578/entrada/${localStorage.getItem('selectedRowId')}?token=${localStorage.getItem('tokenConta')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.entrada;
    }
    
  } catch (err) {
    ExibeError(err.message);   
  }
}