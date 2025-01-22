async function deletarCartao() {
  try {
    const response = await fetch(`http://localhost:2578/delete/cartao?token=${localStorage.getItem('tokenConta')}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "cartaoId": localStorage.getItem('idCartao'),
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.entrada;
    }
  } catch (err) {
    exibeError(err.message);
  }
}