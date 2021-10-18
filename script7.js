
function addTask() {
    let newname = document.getElementById("task-name").value;
    let newdescription = document.getElementById("task-description").value;

    if (newname == "" || newdescription == "") {
        alert("Введите название задачи и ее описание!");
    } else {
        let name = document.querySelector(".task.first h2");
        let description = document.querySelector(".task.first p");
        name.textContent = newname;
        description.textContent = newdescription;
        let task = document.getElementById("task");
        let newtask = task.cloneNode(true);
        newtask.classList.remove("first");
        let tasks = document.getElementById("tasks");
        if (document.getElementById("middleImp").checked) {
            newtask.style.backgroundColor = "orange";
            newtask.setAttribute("class", "task middle");
            let firsttask = document.querySelector(".task:not(.high):not(.first)");
            tasks.insertBefore(newtask, firsttask);
        } else if (document.getElementById("highImp").checked) {
            newtask.style.backgroundColor = "red";
            newtask.setAttribute("class", "task high");
            let firsttask = document.querySelector(".task:not(.first)");
            tasks.insertBefore(newtask, firsttask);
        } else {
            newtask.setAttribute("class", "task normal");
            let firsttask = document.querySelector(".task:not(.high):not(.middle):not(.first)");
            tasks.insertBefore(newtask, firsttask);
        }
        document.getElementById("task-name").value = "";
        document.getElementById("task-description").value = "";
    }
}

const tasksArea = document.getElementById("tasks");
const doneTasksArea = document.getElementById("done-tasks");

let currentTask = null;

function dragover(event) {
    event.preventDefault();
}


function startMove(event) {
    currentTask = event.target;
}

function drop(event) {
    if (event.target.classList.contains("done-tasks")) {
        event.target.appendChild(currentTask);
    }
    console.log(event.target.classList);
    currentTask.classList.remove('task');
    currentTask.classList.add('done-task');
}

tasksArea.addEventListener('dragstart', startMove);
doneTasksArea.addEventListener("drop", drop);
doneTasksArea.addEventListener("dragover", dragover);



