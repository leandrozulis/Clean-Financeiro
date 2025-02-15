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
      cardElement.addEventListener('click', (e) => {
        e.stopPropagation();
        localStorage.setItem('idCartao', cardElement.dataset.id);
        cardElement.style.backgroundColor = "#888"
        cardElement.style.color = "#fff"

        document.querySelectorAll('.card').forEach(card => {
          if (card !== cardElement) {
            card.style.backgroundColor = "";
            card.style.color = "";
          }
        });
      });
      cardsContainer.appendChild(cardElement);
    });

    document.addEventListener('click', (e) => {
      if (!cardsContainer.contains(e.target)) {
        document.querySelectorAll('.card').forEach(card => {
          card.style.backgroundColor = "";
          card.style.color = "";
        });
      }
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
    localStorage.removeItem('idCartao');
    const cartoes = await buscaTodosOsCartoes()
    displayCartoes(cartoes)
    setupAutoLogout();
  }

};