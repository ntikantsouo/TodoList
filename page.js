let tasks = [];

function addTask() {
    const name = document.getElementById("taskName").value;
    const extra = document.getElementById("taskExtra").value;

    if (name === "") {
        alert("La tâche ne peut pas être vide !");
        return;
    }

    let task = {
        name: name,
        done: false,
        extra: extra
    };

    tasks.push(task);
    displayTasks();

    document.getElementById("taskName").value = "";
    document.getElementById("taskExtra").value = "";
}

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.textContent = task.name +
            (task.extra ? " (" + task.extra + ")" : "") +
            (task.done ? " ok" : "");

        if (task.done) li.classList.add("done");
        if (task.name.toLowerCase().includes("urgent")) li.classList.add("urgent");

        const boutonDone = document.createElement("button");
        boutonDone.textContent = "OK";
        boutonDone.onclick = () => toggleDone(index);

        const boutonEdit = document.createElement("button");
        boutonEdit.textContent = "modifier";
        boutonEdit.onclick = () => modifyTask(index);

        const boutonDelete = document.createElement("button");
        boutonDelete.textContent = "supp";
        boutonDelete.onclick = () => deleteTask(index);

        const actions = document.createElement("div");
        actions.appendChild(boutonDone);
        actions.appendChild(boutonEdit);
        actions.appendChild(boutonDelete);

        li.appendChild(actions);
        list.appendChild(li);
    });

    document.getElementById("counter").textContent =
        "Nombre total de tâches : " + tasks.length;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function modifyTask(index) {
    let newName = prompt("Nouveau nom :", tasks[index].name);
    let newExtra = prompt("Nouvelle info :", tasks[index].extra);

    if (newName !== null && newName.trim() !== "") {
        tasks[index].name = newName;
        tasks[index].extra = newExtra;
        displayTasks();
    }
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    displayTasks();
}