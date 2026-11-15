
// Récupération des éléments HTML
const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyMessage = document.getElementById("empty-message");
const filters = document.querySelectorAll(".filter");

// Chargement des tâches depuis le stockage local
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

// Sauvegarder les tâches
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Afficher les tâches
function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {

        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        const content = document.createElement("div");
        content.className = "task-content";

        // Case à cocher
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        // Texte de la tâche
        const span = document.createElement("span");
        span.textContent = task.text;

        // Bouton supprimer
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        content.appendChild(checkbox);
        content.appendChild(span);

        li.appendChild(content);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });

    // Compteur des tâches restantes
    const remaining = tasks.filter(task => !task.completed).length;

    taskCount.textContent =
        `${remaining} tâche${remaining > 1 ? "s" : ""} restante${remaining > 1 ? "s" : ""}`;

    // Message si la liste est vide
    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";
}

// Ajouter une tâche
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Veuillez saisir une tâche !");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    displayTasks();

});

// Marquer une tâche comme terminée
function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();
    displayTasks();
}

// Supprimer une tâche
function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

// Gestion des filtres
filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        displayTasks();

    });

});

// Affichage initial
displayTasks();
