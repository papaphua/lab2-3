let addButton = document.querySelector("nav .addButton");
let inputField = document.querySelector("nav .inputField");
let clearButton = document.querySelector("nav .clearButton");
let sortButton = document.querySelector("nav .sortButton");
let totalText = document.querySelector(".info .total");
let finishedText = document.querySelector(".info .finished");
let unfinishedText = document.querySelector(".info .unfinished");
let ulist = document.querySelector("section ul");
let taskTempl = ulist.firstElementChild;

let todos = []

loadTodos();
updateCounters();

function addTodo(task){
    todos.push({
        name: task.children[1].value,
        completed: task.children[0].checked
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const ref = localStorage.getItem('todos');
    if(ref){
        todos = JSON.parse(ref);
    }
    todos.forEach(todo => {
        addFromLS(todo);
    });
}

function updateCounters() {
    let tasks = document.querySelectorAll(".task");
    let tasksCount = tasks.length;

    let finishedTasks = document.querySelectorAll(".task input[type=checkbox]:checked");
    let finishedCount = finishedTasks.length;

    let unfinishedCount = tasksCount - finishedCount;

    totalText.textContent = tasksCount;
    unfinishedText.textContent = unfinishedCount;
    finishedText.textContent = finishedCount;    
}

function addFromLS(item) {
    const task = taskTempl.cloneNode(true);
    task.style.display = "flex";
    task.className = "task";
    task.children[0].checked = item.completed;
    task.children[1].value = item.name;
    ulist.appendChild(task);
}

function addTask() {
    if (inputField.value !== '') {
        const task = taskTempl.cloneNode(true);
        task.style.display = "flex";
        task.className = "task";
        task.children[1].value = inputField.value;
        inputField.value = "";
        ulist.appendChild(task);
        addTodo(task);
    }
}

function addSortedTask(task) {
    task.style.display = "flex";
    task.className = "task";
    ulist.appendChild(task);
}

function deleteTask(e) {
    if(e.target.className == "delButton") { 
        e.target.parentElement.remove();
        todos = todos.filter(item => {
            return item.name !== e.target.parentElement.children[1].value;
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
} 

function clearTasks(){
    const tasks = document.querySelectorAll(".task");
    tasks.forEach(task => {
        task.remove();
    });
}

function sortTasks() {
    const tasks = document.querySelectorAll(".task");
    clearTasks();
    tasks.forEach(task => {
        if(task.children[0].checked === true) {
            addSortedTask(task);
        }
    });
    tasks.forEach(task => {
        if(task.children[0].checked === false) {
            addSortedTask(task);
        }
    });
}

function changeOrder(e) {
    const tasks = document.querySelectorAll(".task");
    if(e.target.className === "upButton"){
        e.target.parentElement.classList.add("moveUp");
    }
    else if(e.target.className === "downButton"){
        e.target.parentElement.classList.add("moveDown");
    }
    
    for(let i = 0; i < tasks.length; i++) { 
        if(i > 0 || i < tasks.length){
            if(tasks[i].className == "task moveUp"){
            tasks[i].className = "task"; //remove class being used to move elements
            const taskToMove = [tasks[i].children[0].checked, tasks[i].children[1].value]; //contains checkbox(0) and name(1) values
            tasks[i].children[0].checked = tasks[i - 1].children[0].checked; //sets prev task checkbox to selected
            tasks[i].children[1].value = tasks[i - 1].children[1].value; //sets prev task name to selected
            tasks[i - 1].children[0].checked = taskToMove[0]; //sets curr task checkbox to prev
            tasks[i - 1].children[1].value = taskToMove[1]; //sets curr task name to prev
        }
        else if(tasks[i].className == "task moveDown"){
            tasks[i].className = "task"; //remove class being used to move elements
            const taskToMove = [tasks[i].children[0].checked, tasks[i].children[1].value]; //contains checkbox(0) and name(1) values
            tasks[i].children[0].checked = tasks[i + 1].children[0].checked; //sets next task checkbox to selected
            tasks[i].children[1].value = tasks[i + 1].children[1].value; //sets next task name to selected
            tasks[i + 1].children[0].checked = taskToMove[0]; //sets curr task checkbox to next
            tasks[i + 1].children[1].value = taskToMove[1]; //sets curr task name to next
        }
        }
    }
}

addButton.addEventListener("click", addTask);
clearButton.addEventListener("click", clearTasks);
sortButton.addEventListener("click", sortTasks);
document.body.addEventListener("click", deleteTask);
document.body.addEventListener("click", changeOrder);
document.body.addEventListener("click", updateCounters);
window.addEventListener

