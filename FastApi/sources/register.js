var form = document.getElementById('register-form');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var confirmInput = document.getElementById('confirm');
var strengthBar = document.getElementById('strength-bar');
var strengthLabel = document.getElementById('strength-label');

function setError(input, errorId, message) {
  input.classList.toggle('invalid', Boolean(message));
  document.getElementById(errorId).textContent = message || '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Индикатор надёжности пароля
passwordInput.addEventListener('input', function () {
  var value = passwordInput.value;
  var score = 0;
  if (value.length >= 6) score++;
  if (value.length >= 10) score++;
  if (/[0-9]/.test(value) && /[a-zA-Zа-яА-ЯёЁ]/.test(value)) score++;

  var labels = ['Слабый пароль', 'Средний пароль', 'Надёжный пароль', 'Отличный пароль'];
  var colors = ['#ef4444', '#f59e0b', '#22c55e', '#16a34a'];

  strengthBar.style.width = value ? ((score + 1) * 25) + '%' : '0';
  strengthBar.style.background = colors[score];
  strengthLabel.textContent = value ? labels[score] : '';
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var name = nameInput.value.trim();
  var email = emailInput.value.trim();
  var password = passwordInput.value;
  var confirm = confirmInput.value;
  var ok = true;

  if (name.length < 2) {
    setError(nameInput, 'name-error', 'Введите имя (минимум 2 символа)');
    ok = false;
  } else {
    setError(nameInput, 'name-error', '');
  }

  if (!isValidEmail(email)) {
    setError(emailInput, 'email-error', 'Некорректный email');
    ok = false;
  } else {
    setError(emailInput, 'email-error', '');
  }

  if (password.length < 6) {
    setError(passwordInput, 'password-error', 'Пароль должен быть не короче 6 символов');
    ok = false;
  } else {
    setError(passwordInput, 'password-error', '');
  }

  if (!confirm || confirm !== password) {
    setError(confirmInput, 'confirm-error', 'Пароли не совпадают');
    ok = false;
  } else {
    setError(confirmInput, 'confirm-error', '');
  }

  if (!ok) return;

  // Имитация успешной регистрации
  var btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.textContent = 'Создаём аккаунт...';

  setTimeout(function () {
    document.getElementById('register-view').style.display = 'none';
    document.getElementById('success-text').textContent =
      'Аккаунт ' + email + ' создан. Теперь вы можете войти, используя свои данные.';
    document.getElementById('success-view').style.display = 'block';
  }, 800);
});
