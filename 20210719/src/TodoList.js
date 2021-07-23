export default class TodoList extends HTMLElement {
  constructor({ todos, onDelete }) {
    super();
    this.todos = [...todos];
    this.handleDelete = onDelete;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <ul>
        ${this.todos.map((todo, index) => `
        <li>
          ${todo}
          <button type="button" index=${index}>삭제</button>
        </li>`).join('')}
      </ul>
      `;

    const $ul = this.querySelector('ul');
    $ul.addEventListener('click', ({ target }) => {
      if (target.tagName === 'BUTTON') {
        this.handleDelete(target.getAttribute('index'));
      }
    });
  }
}

customElements.define('my-todo-list', TodoList);
