import TodoList from './TodoList.js';
import Form from './Form.js';

export default class App extends HTMLElement {
  constructor() {
    super();
    this.inputValue = '';
    this.todos = [];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <h1>Todo List</h1>
    `;

    const form = new Form({
      onSubmit: (todo) => {
        this.todos.push(todo);
        this.render();
      },
    });

    const todoList = new TodoList({
      todos: this.todos,
      onDelete: (deleteId) => {
        this.todos.splice(deleteId, 1);
        this.render();
      },
    });

    [form, todoList].forEach((child) => {
      this.appendChild(child);
    });
  }
}

customElements.define('my-app', App);
