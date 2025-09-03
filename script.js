let tasks = [];
const btnadd = document.getElementById("add-task");
const inputpop = document.getElementById("pop");
const submit = document.getElementById("submit");
const popup = document.getElementById("absolute");
const taskList = document.getElementById("list");

const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  for (let t of tasks) {
    createTaskElement(t.text, t.done);
  }
}

btnadd.addEventListener("click", function () {
  popup.classList.add("show");
});

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

  const deleteBtn = task.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function () {
    task.remove();
    tasks = tasks.filter((t) => t.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  const completeBtn = task.querySelector(".completed-btn");
  completeBtn.addEventListener("click", function () {
    task.classList.toggle("completed");
    for (let t of tasks) {
      if (t.text === text) t.done = !t.done;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    confetti();
  });

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

submit.addEventListener("click", function () {
  if (inputpop.value.trim() === "") return;

  createTaskElement(inputpop.value);

  tasks.push({ text: inputpop.value, done: false });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  inputpop.value = "";
  popup.classList.remove("show");
});

inputpop.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submit.click();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") popup.classList.remove("show");
});
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.classList.remove("show");
});
