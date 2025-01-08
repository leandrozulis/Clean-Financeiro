function isTokenValid() {
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('expiresAt');

  console.log(token, expiresAt);

  if (!token || !expiresAt) {
      return null; // Retorna `null` se o usuário não estiver logado
  }

  const now = new Date().getTime();
  return now < parseInt(expiresAt, 10); // Retorna `true` ou `false` para validade do token
}

function setupAutoLogout() {
  const expiresAt = localStorage.getItem('expiresAt');
  if (!expiresAt) return;

  const now = new Date().getTime();
  const timeout = parseInt(expiresAt, 10) - now;

  if (timeout > 0) {
    setTimeout(() => logoutUser(), timeout); // Agenda o logout
  } else {
    logoutUser(); // Token já expirou, faz logout imediato
  }
}

function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenConta');
  localStorage.removeItem('expiresAt');
  localStorage.removeItem('selectedRowId');
  alert('Sua sessão expirou. Por favor, faça login novamente.');
  window.location.href = '../Login/index.html'; // Ajuste o caminho conforme sua estrutura
}