function onReady() {
  let toDos = JSON.parse(localStorage.getItem("toDos"));
  if (toDos === null) {
    toDos = [];
  }
  const addToDoForm = document.getElementById('addToDoForm');
  let id = localStorage.getItem("id");
  if(id === null) {
    id = 0;
  }

  function createNewToDo() {
    const newToDoText = document.getElementById('newToDoText');
    if (!newToDoText.value) { return; }

    toDos.push({
      title: newToDoText.value,
      complete: false,
      id: id
    });

    id++;
    localStorage.setItem("id", JSON.stringify(id));

    newToDoText.value = '';

    renderTheUI();

    localStorage.setItem("toDos", JSON.stringify(toDos));
  }

  function renderTheUI() {
    const toDoList = document.getElementById('toDoList');

    toDoList.textContent = '';

    toDos.forEach(function(toDo) {
      const newLi = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.checked = toDo.complete; //restores the checkbox state

      //Saving the checkbox state.
      checkbox.addEventListener('click', event => {
        toDo.complete = checkbox.checked;
        localStorage.setItem("toDos", JSON.stringify(toDos));
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = "Delete";

      deleteButton.addEventListener('click', event => {
        toDos = toDos.filter(function(item){
          return item.id !== toDo.id;
        })
        localStorage.setItem("toDos", JSON.stringify(toDos));
        renderTheUI();
      });

      newLi.textContent = toDo.title;

      toDoList.appendChild(newLi);
      newLi.appendChild(checkbox);
      newLi.appendChild(deleteButton);
    });

  }

  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
  });

  renderTheUI();
}

window.onload = function() {
  onReady();
};
