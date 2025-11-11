'use strict'
const curUserJSON = localStorage.getItem('currentUser');
const curUser = JSON.parse(curUserJSON);

if (curUser == null) {
    window.location.href = '../pages/login.html'
}


const todoInput = document.getElementById('input-task')
const addBtn = document.getElementById('btn-add')
const todoList = document.getElementById('todo-list')

class Task {
    constructor(task, owner, isDone) {
        this.task = task
        this.owner = owner
        this.isDone = isDone
    }
}

let todoArr = JSON.parse(localStorage.getItem('todoArr')) || []

const renderTasks = () => {
    todoList.innerHTML = ''

    todoArr.forEach((task, index) => {
        if (task.owner === curUser.username) {
            const finishedClass = task.isDone ? 'checked' : '';
            const html = `
                <li class="${finishedClass}" data-index="${index}">
                    ${task.task}
                    <span class="close">×</span>
                </li>
            `;
            todoList.insertAdjacentHTML('beforeend', html);
        }
    });
}

const saveToStorage = () => {
    localStorage.setItem('todoArr', JSON.stringify(todoArr));
}

addBtn.addEventListener('click', function() {
    const taskText = todoInput.value.trim();

    if (taskText === '') {
        alert('Vui lòng nhập nội dung công việc!');
    } else {
        const newTask = new Task(
            taskText,
            curUser.username,
            false
        );

        todoArr.push(newTask);
        saveToStorage();
        renderTasks();
        todoInput.value = '';
        console.log(todoArr)
    }
});

todoList.addEventListener('click', function(event) {
    const clickedLi = event.target.closest('li');
    if (!clickedLi) return;
    const index = Number(clickedLi.dataset.index);
    const task = todoArr[index];

    if (event.target.classList.contains('close')) {
        todoArr.splice(index, 1);
    } else {
        task.isDone = !task.isDone;
    }
    saveToStorage();
    renderTasks();
});

renderTasks();