async function quitarParcelaContaAPagar(valor) {
  try {
    const response = await fetch(`http://localhost:2578/atualiza/contaapagar?token=${localStorage.getItem('tokenConta')}&cartaoId=${localStorage.getItem('idCartao')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "contaapagarId": localStorage.getItem('registroIdConta'),
        "valorPago": valor
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.contaApagar;
    }
  } catch (err) {
    return exibeError(err.message);
  }
}