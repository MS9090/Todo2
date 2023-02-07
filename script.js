const taskInput = document.querySelector(".task-input");
const taskInputField = document.querySelector(".task-input-field");
const taskList = document.querySelector(".task-list");
const notificationMessage = document.querySelector(".notification")

const pending = "pending";
const completed = "completed";

class taskItem {
  constructor(text, status) {
    this.text = text;
    this.status = status;
  }
}

taskInput.addEventListener ("submit", addTask);
taskList.addEventListener("click", changeTask);
document.addEventListener("DOMContentLoaded", getTasks);

function addTask(event) {
  // console.log("aaa")
  event.preventDefault();
 
if (taskInputField.value == "") {
    showNotification("Upišite zadatak!");
  } else {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const newTask = document.createElement("li");
    newTask.innerText = taskInputField.value;
    newTask.classList.add("task-item");
    taskDiv.appendChild(newTask);
  
    saveToLocalStorage(new taskItem(taskInputField.value, pending));

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.classList.add("delete-task-button");
    taskDiv.appendChild(deleteButton);

    taskList.appendChild(taskDiv);

    taskInputField.value = "";
  }
}

function showNotification(msg) {
  notificationMessage.innerHTML = msg;
  notificationMessage.classList.add('notification-enter');
  setTimeout(() => {
  notificationMessage.classList.remove('notification-enter');
  }, 2000);
}

function changeTask(e) {
  const item = e.target;

  if (item.classList[0] === "task-item") {
    const task = item.parentElement;
    task.classList.toggle("completed");
    saveToLocalStorage(new taskItem(task.children[0].innerText, completed));
  }
  
  if (item.classList[0] === "delete-task-button") {
    const task = item.parentElement;
    removeLocalTasks(task.children[0].innerText)
    task.remove();
  }  
}

function saveToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  const itemIndex = tasks.findIndex((element, index) => {
    if (element.text === task.text) {
      return true;
    }
  });
  if (itemIndex == -1) {
    tasks.push(task);
  } else {
    if (tasks[itemIndex].status === completed) {
      task.status = pending;
    } else if (tasks[itemIndex].status === pending) {
      task.status = completed;
    }
    tasks[itemIndex] = task;
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task) => createTaskItem(task));
}

function createTaskItem(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const newTask = document.createElement("li");
  newTask.innerText = task.text;
  newTask.classList.add("task-item");
  taskDiv.appendChild(newTask);
  if (task.status === completed) {
    taskDiv.classList.toggle("completed");
  }
  taskDiv.appendChild(newTask);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteButton.classList.add("delete-task-button");
  taskDiv.appendChild(deleteButton);

  taskList.appendChild(taskDiv);;
}

function removeLocalTasks(taskText) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  const itemIndex = tasks.findIndex((element, index) => {
    if (element.text === taskText) {
      return true;
    }
  });

  if (itemIndex != -1) {
    tasks.splice(itemIndex, 1);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}