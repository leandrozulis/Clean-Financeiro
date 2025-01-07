const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const refectorPasswordForm = document.getElementById('refectorPasswordForm');
const showRegister = document.getElementById('showRegister');
const showRefectorPassword = document.getElementById('showRefectorPassword');
const showLogin = document.getElementById('showLogin');

showRefectorPassword.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.remove('active');
  refectorPasswordForm.classList.add('active');
});

showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    refectorPasswordForm.classList.remove('active');
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});