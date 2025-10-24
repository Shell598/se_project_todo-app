class Todo {
  constructor(data, selector, updateTodoCounter, handleDeleteTodo) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  this._updateTodoCounter = updateTodoCounter;
    this._handleDeleteTodo = handleDeleteTodo;
  }
  

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDeleteTodo(this._data.completed);
    });

    this._todoCheckboxElement.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxElement.checked;
      this._updateTodoCounter(this._data.completed);
    });
  }

  _generateCheckbox() {
    this._todoCheckboxElement = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxElement.checked = this._data.completed;
    this._todoCheckboxElement.id = 'todo-${this._data.id}';
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content.querySelector(".todo").cloneNode(true);
    const todoNameElement = this._todoElement.querySelector(".todo__name");
    const todoDateElement = this._todoElement.querySelector(".todo__date");
  this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
  todoNameElement.textContent = this._data.name;
  const dueDate = new Date(this._data.date);
  if (!isNaN(dueDate)) {
    todoDateElement.textContent = dueDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });}
  
  this._generateCheckbox();
  this._setEventListeners();
  return this._todoElement;
  }
}
export default Todo;
