export default class Form extends HTMLElement {
  constructor({ onSubmit }) {
    super();
    this.inputValue = '';
    this.handleSubmit = onSubmit;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <form 
        data-testid="form"  
        id="form" 
    >
        <label for="input-todo">To-do</label>
        <input 
            type="text" 
            id="input-todo"
        >
        <button 
            type="submit"
            id="enroll-button"
        >
        등록
        </button>
    </form>    
`;

    const $input = this.querySelector('#input-todo');

    const $form = this.querySelector('#form');
    $form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit($input.value);
    });
  }
}

customElements.define('my-form', Form);
