const STORAGE_KEY = 'focusflow.tasks.v1';
const form = document.querySelector('#taskForm');
const input = document.querySelector('#taskInput');
const priorityInput = document.querySelector('#priorityInput');
const list = document.querySelector('#taskList');
const emptyState = document.querySelector('#emptyState');
let tasks = loadTasks();
let currentFilter = 'all';

function loadTasks() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveTasks() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
function createTask(name, priority) {
  return { id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())), name, priority, done: false };
}
function render() {
  const visible = tasks.filter(task => currentFilter === 'all' || (currentFilter === 'active' ? !task.done : task.done));
  list.innerHTML = '';
  emptyState.hidden = visible.length > 0;
  if (!visible.length) {
    emptyState.querySelector('strong').textContent = tasks.length ? 'No hay tareas en esta vista' : 'Todo está bajo control';
    emptyState.querySelector('p').textContent = tasks.length ? 'Prueba otro filtro o añade una nueva tarea.' : 'Añade tu primera tarea y empieza a avanzar.';
  }
  visible.forEach(task => {
    const item = document.createElement('article');
    item.className = `task-item${task.done ? ' completed' : ''}`;
    const check = document.createElement('input');
    check.type = 'checkbox'; check.className = 'task-check'; check.checked = task.done;
    check.setAttribute('aria-label', `Marcar ${task.name} como ${task.done ? 'pendiente' : 'completada'}`);
    check.addEventListener('change', () => updateTask(task.id, { done: check.checked }));
    const name = document.createElement('span'); name.className = 'task-name'; name.textContent = task.name;
    const priority = document.createElement('span'); priority.className = `priority ${task.priority}`; priority.textContent = ({high:'Alta',normal:'Normal',low:'Baja'})[task.priority];
    const remove = document.createElement('button'); remove.className = 'delete-task'; remove.type = 'button'; remove.textContent = '×'; remove.setAttribute('aria-label', `Eliminar ${task.name}`);
    remove.addEventListener('click', () => { tasks = tasks.filter(t => t.id !== task.id); persistAndRender(); });
    item.append(check, name, priority, remove); list.append(item);
  });
  const done = tasks.filter(t => t.done).length;
  document.querySelector('#totalStat').textContent = tasks.length;
  document.querySelector('#doneStat').textContent = done;
  document.querySelector('#pendingStat').textContent = tasks.length - done;
  document.querySelector('#allCount').textContent = tasks.length;
  document.querySelector('#taskTotal').textContent = `${visible.length} ${visible.length === 1 ? 'tarea' : 'tareas'}`;
  document.querySelectorAll('[data-filter]').forEach(button => button.classList.toggle('active', button.dataset.filter === currentFilter));
}
function updateTask(id, changes) { tasks = tasks.map(t => t.id === id ? {...t, ...changes} : t); persistAndRender(); }
function persistAndRender() { saveTasks(); render(); }

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = input.value.trim();
  if (!name) return;
  tasks.unshift(createTask(name, priorityInput.value));
  persistAndRender(); form.reset(); input.focus();
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter; render();
}));
document.querySelector('#clearDone').addEventListener('click', () => {
  tasks = tasks.filter(task => !task.done); persistAndRender();
});
const now = new Date();
document.querySelector('#todayDate').textContent = now.getDate();
render();
