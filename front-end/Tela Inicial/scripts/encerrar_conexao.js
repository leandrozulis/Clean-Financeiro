const sair = document.getElementById('sair')

sair.addEventListener('click', (e) => {
  localStorage.removeItem('expiresAt')
  localStorage.removeItem('token')
  localStorage.removeItem('tokenConta')

  window.innerWidth = '../Login/index.html'
})