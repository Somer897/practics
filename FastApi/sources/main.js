// Имя пользователя, сохранённое на странице входа
var user = localStorage.getItem('demo-user');
if (user) {
  document.getElementById('username').textContent = user;
  document.getElementById('avatar').textContent = user.charAt(0).toUpperCase();
}

// Выход: удаляем только имя, задачи остаются
document.getElementById('logout').addEventListener('click', function () {
  localStorage.removeItem('demo-user');
});

// Часы
function tick() {
  document.getElementById('clock').textContent = new Date().toLocaleTimeString('ru-RU');
}
tick();
setInterval(tick, 1000);

// Список задач с сохранением в localStorage
var KEY = 'demo-tasks';
var defaultTasks = [
  { text: 'Открыть личный кабинет', done: true },
  { text: 'Изучить основы HTML и CSS', done: false },
  { text: 'Написать первый скрипт на JavaScript', done: false }
];

var tasks;
try {
  tasks = JSON.parse(localStorage.getItem(KEY)) || defaultTasks.slice();
} catch (e) {
  tasks = defaultTasks.slice();
}

var list = document.getElementById('task-list');
var input = document.getElementById('todo-input');

function save() {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

function updateStats() {
  var done = tasks.filter(function (t) { return t.done; }).length;
  document.getElementById('stat-total').textContent = tasks.length;
  document.getElementById('stat-done').textContent = done;
  document.getElementById('stat-active').textContent = tasks.length - done;
}

function render() {
  list.innerHTML = '';

  if (!tasks.length) {
    var empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'Задач пока нет — добавьте первую!';
    list.appendChild(empty);
    updateStats();
    return;
  }

  tasks.forEach(function (task, index) {
    var li = document.createElement('li');
    li.className = 'task' + (task.done ? ' done' : '');

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', function () {
      tasks[index].done = checkbox.checked;
      save();
      render();
    });

    var text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;

    var del = document.createElement('button');
    del.type = 'button';
    del.className = 'delete-btn';
    del.textContent = '\u00d7';
    del.title = 'Удалить задачу';
    del.addEventListener('click', function () {
      tasks.splice(index, 1);
      save();
      render();
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(del);
    list.appendChild(li);
  });

  updateStats();
}

function addTask() {
  var text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }
  tasks.push({ text: text, done: false });
  save();
  render();
  input.value = '';
  input.focus();
}

document.getElementById('add-btn').addEventListener('click', addTask);
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') addTask();
});

render();
