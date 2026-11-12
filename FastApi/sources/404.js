// Случайное «объяснение» произошедшего
var phrases = [
  'Кажется, эта страница ушла в отпуск и забыла вернуться.',
  'Мы обыскали весь сайт, но так её и не нашли.',
  'Кто-то, вероятно, съел эту страницу. Бывает.',
  'Страница существует... в другой вселенной.',
  'Здесь пусто. Совсем. Даже пыли нет.'
];

document.getElementById('phrase').textContent =
  phrases[Math.floor(Math.random() * phrases.length)];

// Кнопка «Назад»: в историю, а если её нет — на главную
document.getElementById('back-btn').addEventListener('click', function () {
  if (history.length > 1) {
    history.back();
  } else {
    window.location.href = 'home.html';
  }
});
