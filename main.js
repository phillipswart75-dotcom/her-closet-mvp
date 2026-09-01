// Simple To-Do list with localStorage
// Data model: [{id, text, completed, createdAt}]

const STORAGE_KEY = 'her-closet-todo:v1';

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter');

let todos = loadTodos();
let currentFilter = 'all';

// --- Storage ---
function loadTodos(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return [];
    return JSON.parse(raw);
  }catch(e){
    console.error('Failed to parse todos from localStorage', e);
    return [];
  }
}

function saveTodos(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// --- Rendering ---
function render(){
  todoList.innerHTML = '';
  const filtered = todos.filter(t => {
    if(currentFilter === 'active') return !t.completed;
    if(currentFilter === 'completed') return t.completed;
    return true;
  });

  if(filtered.length === 0){
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.textContent = 'No tasks';
    todoList.appendChild(li);
  }else{
    filtered.forEach(t => todoList.appendChild(renderTodoItem(t)));
  }

  const remaining = todos.filter(t => !t.completed).length;
  taskCount.textContent = `${remaining} ${remaining === 1 ? 'task' : 'tasks'}`;
}

function renderTodoItem(todo){
  const li = document.createElement('li');
  li.className = 'todo-item' + (todo.completed ? ' completed' : '');
  li.setAttribute('data-id', todo.id);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => toggleComplete(todo.id));

  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = todo.text;
  title.contentEditable = true;
  title.addEventListener('blur', (e) => updateText(todo.id, e.target.textContent.trim()));
  title.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      e.target.blur();
    }
  });

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.style.color = '#6b7280';
  meta.style.fontSize = '0.8rem';
  const date = new Date(todo.createdAt);
  meta.textContent = date.toLocaleString();

  const delBtn = document.createElement('button');
  delBtn.title = 'Delete';
  delBtn.innerHTML = '🗑️';
  delBtn.addEventListener('click', () => deleteTodo(todo.id));

  li.appendChild(checkbox);
  li.appendChild(title);
  li.appendChild(meta);
  li.appendChild(delBtn);

  return li;
}

// --- Actions ---
function addTodo(text){
  const trimmed = text.trim();
  if(!trimmed) return;
  const todo = {
    id: cryptoRandomId(),
    text: trimmed,
    completed: false,
    createdAt: Date.now()
  };
  todos.unshift(todo);
  saveTodos();
  render();
}

function deleteTodo(id){
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  render();
}

function toggleComplete(id){
  todos = todos.map(t => t.id === id ? {...t, completed: !t.completed} : t);
  saveTodos();
  render();
}

function updateText(id, newText){
  if(!newText) return deleteTodo(id);
  todos = todos.map(t => t.id === id ? {...t, text: newText} : t);
  saveTodos();
  render();
}

function clearCompleted(){
  todos = todos.filter(t => !t.completed);
  saveTodos();
  render();
}

function setFilter(filter){
  currentFilter = filter;
  filterButtons.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
  render();
}

// --- Helpers ---
function cryptoRandomId(){
  // small unique id using crypto if available
  if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return 'id-' + Math.random().toString(36).slice(2,9);
}

// --- Events ---
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo(todoInput.value);
  todoInput.value = '';
  todoInput.focus();
});

clearCompletedBtn.addEventListener('click', () => {
  clearCompleted();
});

filterButtons.forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter)));

// initial render
render();
