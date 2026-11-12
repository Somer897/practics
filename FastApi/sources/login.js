var form = document.getElementById('login-form');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var formError = document.getElementById('form-error');
var submitBtn = document.getElementById('submit-btn');

// Показать / скрыть пароль
document.getElementById('show-password').addEventListener('change', function () {
  passwordInput.type = this.checked ? 'text' : 'password';
});

// Заглушка для ссылки «Забыли пароль?»
document.getElementById('forgot').addEventListener('click', function (e) {
  e.preventDefault();
  alert('Восстановление пароля недоступно в демо-режиме.');
});

function setError(input, errorId, message) {
  input.classList.toggle('invalid', Boolean(message));
  document.getElementById(errorId).textContent = message || '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  formError.style.display = 'none';
  formError.style.background = '#fef2f2';
  formError.style.borderColor = '#fecaca';
  formError.style.color = '#b91c1c';

  var email = emailInput.value.trim();
  var password = passwordInput.value;
  var ok = true;

  if (!email) {
    setError(emailInput, 'email-error', 'Введите email');
    ok = false;
  } else if (!isValidEmail(email)) {
    setError(emailInput, 'email-error', 'Некорректный email');
    ok = false;
  } else {
    setError(emailInput, 'email-error', '');
  }

  if (!password) {
    setError(passwordInput, 'password-error', 'Введите пароль');
    ok = false;
  } else if (password.length < 6) {
    setError(passwordInput, 'password-error', 'Пароль должен быть не короче 6 символов');
    ok = false;
  } else {
    setError(passwordInput, 'password-error', '');
  }

  if (!ok) return;

  // Имитация входа
  submitBtn.disabled = true;
  submitBtn.textContent = 'Входим...';

  setTimeout(function () {
    localStorage.setItem('demo-user', email.split('@')[0]);

    formError.textContent = 'Вход выполнен! Сейчас вы будете перенаправлены...';
    formError.style.background = '#f0fdf4';
    formError.style.borderColor = '#bbf7d0';
    formError.style.color = '#15803d';
    formError.style.display = 'block';

    setTimeout(function () {
      window.location.href = 'main.html';
    }, 900);
  }, 700);
});
