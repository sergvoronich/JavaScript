
function addTask() {
    let newname = document.getElementById("task-name").value;
    let newdescription = document.getElementById("task-description").value;

    if (newname == "" || newdescription == "") {
        alert("Введите название задачи и ее описание!");
    } else {
        let name = document.querySelector(".task h2");
        let description = document.querySelector(".task p");
        name.textContent = newname;
        description.textContent = newdescription;
        let task = document.getElementById("task");
        let newtask = task.cloneNode(true);
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