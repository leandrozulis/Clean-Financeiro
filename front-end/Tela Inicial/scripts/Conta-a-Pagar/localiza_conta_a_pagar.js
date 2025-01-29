async function buscaDadosContaAPagar() {
  try {
    const response = await fetch(`http://localhost:2578/find/contasapagar/${localStorage.getItem('contaapagarId')}?token=${localStorage.getItem('tokenConta')}&cartaoId=${localStorage.getItem('idCartao')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.contaApagar;
    }
    
  } catch (err) {
    ExibeError(err.message);   
  }
}