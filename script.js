let tasks = [];
const btnadd = document.getElementById("add-task");
const inputpop = document.getElementById("pop");
const submit = document.getElementById("submit");
const popup = document.getElementById("absolute");
const taskList = document.getElementById("list");
btnadd.addEventListener("click", function () {
  popup.classList.add("show");
});
submit.addEventListener("click", function () {
  const task = document.createElement("div");
task.classList.add("task");
task.innerHTML = `
  
    <!-- Left: Title -->
    <h3>${inputpop.value}</h3>

    <!-- Right: Buttons -->
    <div style="display: flex; gap: 0.5rem">
      <button class="circular delete-btn" type="button" id="delete">
        <span class="material-symbols-outlined"> delete </span>
      </button>
      <button class="circular completed" type="button">
        <span class="material-symbols-outlined"> download_done </span>
      </button>
      <button class="circular edit-btn" type="button">
        <span class="material-symbols-outlined"> edit </span>
      </button>
    </div>
  </div>
`;

// Append the actual DOM element
document.getElementById("list").appendChild(task);
//logicof delete btn
 const deleteBtn = task.querySelector(".delete-btn");
deleteBtn.addEventListener("click",function(){
  task.remove()
})

//logic of done btn
const complete = task.querySelector(".completed")
complete.addEventListener("click", function(){
  task.classList.add("completed")
  confetti();

})
 
//logic of edit btn
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
  taskText.textContent = newValue || taskText.textContent;
  task.replaceChild(taskText, editInput);
}

editInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") finishEdit();
});
editInput.addEventListener("blur", finishEdit);

});
inputpop.value = "";


// local storage 
// créer objet
const newTask = { text: inputpop.value, done: false };

// ajouter dans le tableau
tasks.push(newTask);

// sauvegarder dans local storage
localStorage.setItem("tasks", JSON.stringify(tasks));
// vérifier s’il y a des tâches sauvegardées
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  tasks = JSON.parse(savedTasks); // convertir en tableau
  // recréer chaque tâche dans le DOM
  for (let t of tasks) {
    
  }
}

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
