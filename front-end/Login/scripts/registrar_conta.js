const cadastrarConta = document.getElementById('cadastrarConta');

cadastrarConta.addEventListener('click', async (e) => {

  e.preventDefault();

  const nome = document.getElementById('nomeCadastro').value;
  const email = document.getElementById('emailCadastro').value;
  const senha = document.getElementById('senhaCadastro').value;
  const confirmaSenhaCadastro = document.getElementById('confirmaSenhaCadastro').value;

  if (senha !== confirmaSenhaCadastro) {
    alert('As senhas não conferem!');
    return;
  }

  try {
    const response = await fetch('http://localhost:2578/create/conta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (response.ok) {

      await response.json();
      alert('Conta cadastrada com sucesso!');
      window.location.href = './index.html';

    } else {
      const error = await response.json();
      console.error('Erro no cadastro da conta:', error.message);
      alert('Erro no cadastro da conta: ' + error.message);
    }
  } catch (err) {
    console.error('Erro na requisição:', err);
    alert('Erro ao conectar ao servidor.');
  }

})