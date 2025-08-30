const btnadd = document.getElementById("add-task");
const inputpop = document.getElementById("pop");
const submit = document.getElementById("submit");
const popup = document.getElementById("absolute");
const taskList = document.getElementById("list");
btnadd.addEventListener("click", function () {
  popup.classList.add("show");
});
submit.addEventListener("click", function () {
 
  const text = inputpop.value.trim();
  if (!text) return;
  //add element which will be the task
  const card = document.createElement('div');
card.classList.add('card');//give it a class name to style it later
//Create an icons container + buttons
const icons = document.createElement('div');
icons.classList.add('icons');
//done btn
const doneBtn = document.createElement('button');
doneBtn.type = 'button';
doneBtn.classList.add('done-btn');
doneBtn.textContent = '✔';
//edit btn
const editBtn = document.createElement('button');
editBtn.type = 'button';
editBtn.classList.add('edit-btn');
editBtn.textContent = '✏️';
//delete btn
const deleteBtn = document.createElement('button');
deleteBtn.type = 'button';
deleteBtn.classList.add('delete-btn');
deleteBtn.textContent = '🗑️';
//add these buttons to the icons div
icons.appendChild(doneBtn);
icons.appendChild(editBtn);
icons.appendChild(deleteBtn);
//Create the task text element
const taskText = document.createElement('span');
taskText.classList.add('task-text');
taskText.textContent = text;
//Put everything into the card
card.appendChild(icons);
card.appendChild(taskText);
//Add the card to the list
taskList.prepend(card);

inputpop.value = '';
popup.classList.remove("show");
//Add functionality to each button
deleteBtn.addEventListener('click', () => card.remove());

doneBtn.addEventListener('click', () => {
  card.classList.toggle('done');
});

editBtn.addEventListener('click', () => {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = taskText.textContent;
  editInput.classList.add('edit-input');

  card.replaceChild(editInput, taskText);
  editInput.focus();

  editInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finishEdit();
  });
  editInput.addEventListener('blur', finishEdit);

  function finishEdit() {
    const newValue = editInput.value.trim();
    taskText.textContent = newValue || taskText.textContent;
    card.replaceChild(taskText, editInput);
  }
});
inputpop.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submit.click();
});
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') popup.classList.remove('show');
});
popup.addEventListener('click', e => {
  if (e.target === popup) popup.classList.remove('show');
});
