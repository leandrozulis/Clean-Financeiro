async function registraRendaFixa(valor) {
  try {
    const response = await fetch(`http://localhost:2578/register/rendafixa?token=${localStorage.getItem('tokenConta')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "valor": Number(valor)
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.rendaFixa;
    }
    
  } catch (err) {
    ExibeError(err.message);
  }
}