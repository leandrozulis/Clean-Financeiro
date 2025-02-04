async function DeletarRendaFixa() {
  try {
    const response = await fetch(`http://localhost:2578/remove/rendafixa?token=${localStorage.getItem('tokenConta')}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "rendaFixaId": localStorage.getItem('rendaFixaId'),
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