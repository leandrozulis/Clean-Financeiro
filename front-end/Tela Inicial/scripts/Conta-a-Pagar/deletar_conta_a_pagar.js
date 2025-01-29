async function deletarContaAPagar() {
  try {
    const response = await fetch(`http://localhost:2578/remove/contaapagar?token=${localStorage.getItem('tokenConta')}&cartaoId=${localStorage.getItem('idCartao')}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "contaapagarId": localStorage.getItem('contaapagarId'),
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.contaApagar;
    }
  } catch (err) {
    exibeError(err.message);
  }
}