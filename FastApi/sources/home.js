(function () {
  // Приветствие в зависимости от времени суток
  var hours = new Date().getHours();
  var phrase = 'Добро пожаловать на';
  if (hours >= 5 && hours < 12) phrase = 'Доброе утро — вы на';
  else if (hours >= 12 && hours < 18) phrase = 'Добрый день — вы на';
  else if (hours >= 18 && hours < 23) phrase = 'Добрый вечер — вы на';

  document.getElementById('greeting').innerHTML = phrase + ' <span>МойСайт</span>!';

  // Текущий год в подвале
  document.getElementById('year').textContent = new Date().getFullYear();
})();
