const input = document.getElementById('taskInput');
const list = document.getElementById('list');
document.getElementById('addBtn').addEventListener('click', addTask);
input.addEventListener('keypress', e => { if (e.key === 'Enter') addTask(); });

function addTask() {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.innerHTML = `<input type="checkbox"><span></span>
    <div><button class="up">Up</button><button class="down">Down</button><button class="del">Delete</button></div>`;
  li.querySelector('span').textContent = text;
  li.querySelector('input').addEventListener('change', e => li.classList.toggle('done', e.target.checked));
  li.querySelector('.del').addEventListener('click', () => li.remove());
  li.querySelector('.up').addEventListener('click', () => {
    if (li.previousElementSibling) list.insertBefore(li, li.previousElementSibling);
  });
  li.querySelector('.down').addEventListener('click', () => {
    if (li.nextElementSibling) list.insertBefore(li.nextElementSibling, li);
  });
  list.appendChild(li);
  input.value = '';
}
