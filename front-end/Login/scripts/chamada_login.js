const loginFormElement = document.getElementById('loginFormElement');

loginFormElement.addEventListener('submit', async (e) => {
  e.preventDefault(); // Previne o envio padrão do formulário

  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:2578/autentica', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {

      const data = await response.json();
      const token = data.token;
      const expirationTime = getTokenExpiration(token);

      localStorage.setItem('token', data.token);
      localStorage.setItem('expiresAt', expirationTime.toString());
      localStorage.setItem('tokenConta', data.tokenConta);

      window.location.href = '../Tela Inicial/tela_inicial.html';

    } else {
      const error = await response.json();
      console.error('Erro no login:', error.error);
      alert('Erro no login: ' + error.error);
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro ao conectar ao servidor.');
  }
});


function getTokenExpiration(token) {
  const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do token

  console.log(payload);

  return payload.exp * 1000; // Multiplica por 1000 para obter a data em milissegundos
}