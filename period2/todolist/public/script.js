document.getElementById('login-button').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('todolist-section').style.display = 'block';
        loadTasks();
    } else {
        alert(data.mensaje);
    }
});

async function loadTasks() {
    const token = localStorage.getItem('token');
    const response = await fetch('/tareas', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const tasks = await response.json();
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.descripcion + (task.completada ? ' (Completada)' : '');
        tasksList.appendChild(li);
    });
}

document.getElementById('add-task-button').addEventListener('click', async () => {
    const descripcion = document.getElementById('new-task').value;
    const token = localStorage.getItem('token');

    const response = await fetch('/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ descripcion })
    });

    if (response.ok) {
        loadTasks();
        document.getElementById('new-task').value = '';
    }
});

document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('token');
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('todolist-section').style.display = 'none';
});