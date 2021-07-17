export default class App extends HTMLElement {
  constructor() {
    super();
    this.number = 0;
  }

  connectedCallback() {
    this.render(this.number);
  }

  setEvent() {
    const plusButton = this.querySelector('.plus');
    plusButton.addEventListener('click', () => {
      this.number += 1;

      this.render(this.number);
    });
  }

  render(number) {
    this.innerHTML = `
      <div>
        <span class="number">${number}</span>
        <button class="plus">+</button>
        <button class="minus">-</button>
      </div>
    `;

    this.setEvent();
  }
}

customElements.define('my-app', App);
