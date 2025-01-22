async function buscaTodosOsCartoes() {
  try {
    const response = await fetch(`http://localhost:2578/find/allcartoes?token=${localStorage.getItem('tokenConta')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      
      return data.cartoes;
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro ao conectar ao servidor.');
  }
}

function displayCartoes(cartoes) {
  const cardsContainer = document.getElementById('cards');
  cardsContainer.innerHTML = ''; // Clear existing content

  if (cartoes.length === 0) {
    cardsContainer.innerHTML = '<p>Nenhum cartão cadastrado.</p>';
  } else {
    cartoes.forEach(cartao => {
      const cardElement = document.createElement('div');
      cardElement.dataset.id = cartao.id;
      cardElement.classList.add('card');
      cardElement.innerHTML = `
        <h2>${cartao.descricao}</h2>
        <p>Banco: ${cartao.nomeBanco}</p>
      `;
      cardsContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        localStorage.setItem('idCartao', this.dataset.id);
      });
      cardsContainer.appendChild(cardElement);
    });
  }
}

window.onload = async function () {

  const isValid = isTokenValid();

  if (isValid === null) {
    window.location.href = '../../../Login/index.html'
  } else if (!isValid) {
    logoutUser();
  } else {
    localStorage.removeItem('selectedRowId');
    const cartoes = await buscaTodosOsCartoes()
    displayCartoes(cartoes)
    setupAutoLogout();
  }

};