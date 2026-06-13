import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const addTodoForm = document.querySelector("#add-todo-form");
const formValidator = new FormValidator(validationConfig, addTodoForm);

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    updateTodoCounter,
    handleDeleteTodo
  );
  const todoElement = todo.getView();

  return todoElement;
};

const renderTodos = (items) => {
  const todoElement = generateTodo(items);
  section.addItem(todoElement);
};

const todoCounter = new TodoCounter(initialTodos, ".todo-counter");

function updateTodoCounter(increment) {
  todoCounter.updateCompleted(increment);
}

function updateTodoTotal(increment) {
  todoCounter.updateTotal(increment);
}

function handleDeleteTodo(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
    todoCounter.updateTotal(false);
  } else {
    todoCounter.updateTotal(false);
  }
}

const section = new Section({
  items: initialTodos,
  renderer: renderTodos,
  containerSelector: ".todos__list",
});

section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (data) => {
    const name = data.name;
    const dateInput = data.date;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const id = uuidv4();
    const values = { id, name, date };
    updateTodoTotal(true);
    renderTodos(values);
    addTodoPopup.close(addTodoPopupEl);
    todoValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const todoValidator = new FormValidator(validationConfig, addTodoForm);
todoValidator.enableValidation();
