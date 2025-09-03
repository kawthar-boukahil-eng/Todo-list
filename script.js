let tasks = [];
const btnadd = document.getElementById("add-task");
const inputpop = document.getElementById("pop");
const submit = document.getElementById("submit");
const popup = document.getElementById("absolute");
const taskList = document.getElementById("list");

// Charger les tâches sauvegardées au démarrage
const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  for (let t of tasks) {
    createTaskElement(t.text, t.done);
  }
}

// Ouvrir popup
btnadd.addEventListener("click", function () {
  popup.classList.add("show");
});

// Fonction pour créer une tâche dans le DOM
function createTaskElement(text, done = false) {
  const task = document.createElement("div");
  task.classList.add("task");
  if (done) task.classList.add("completed");

  task.innerHTML = `
    <h3>${text}</h3>
    <div style="display: flex; gap: 0.5rem">
      <button class="circular delete-btn" type="button">
        <span class="material-symbols-outlined"> delete </span>
      </button>
      <button class="circular completed-btn" type="button">
        <span class="material-symbols-outlined"> download_done </span>
      </button>
      <button class="circular edit-btn" type="button">
        <span class="material-symbols-outlined"> edit </span>
      </button>
    </div>
  `;

  // Supprimer
  const deleteBtn = task.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function () {
    task.remove();
    tasks = tasks.filter((t) => t.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  // Marquer comme terminé
  const completeBtn = task.querySelector(".completed-btn");
  completeBtn.addEventListener("click", function () {
    task.classList.toggle("completed");
    for (let t of tasks) {
      if (t.text === text) t.done = !t.done;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    confetti();
  });

  // Éditer
  const editBtn = task.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    const taskText = task.querySelector("h3");
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskText.textContent;
    task.replaceChild(editInput, taskText);
    editInput.focus();

    function finishEdit() {
      const newValue = editInput.value.trim();
      if (newValue) {
        taskText.textContent = newValue;
        for (let t of tasks) {
          if (t.text === text) t.text = newValue;
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
      task.replaceChild(taskText, editInput);
    }

    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") finishEdit();
    });
    editInput.addEventListener("blur", finishEdit);
  });

  taskList.appendChild(task);
}

// Quand on clique sur Submit
submit.addEventListener("click", function () {
  if (inputpop.value.trim() === "") return;

  // Ajouter dans DOM
  createTaskElement(inputpop.value);

  // Ajouter dans tableau
  tasks.push({ text: inputpop.value, done: false });

  // Sauvegarder
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Réinitialiser input
  inputpop.value = "";
  popup.classList.remove("show");
});

// Raccourcis clavier
inputpop.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submit.click();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") popup.classList.remove("show");
});
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.classList.remove("show");
});
