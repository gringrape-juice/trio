import root from '../assets/api/root.js';
import Cats from '../assets/api/Cats.js';

import Nodes from './Nodes.js';

export default class App extends HTMLElement {
  constructor() {
    super();
    this.nodes = root;
    this.currentPath = 'root';
    this.history = ['root'];
  }

  connectedCallback() {
    this.render();
  }

  handleClickFolder(name) {
    // TODO: fetch current nodes
    const { 1: yellowCat } = Cats;
    this.nodes = yellowCat;

    if (this.currentPath !== name) {
      this.history.push(name);
    }
    this.currentPath = name;

    this.render();
  }

  handleClickPrev() {
    this.history.pop();

    const [last] = this.history.slice(-1);

    this.currentPath = last;

    this.render();
  }

  render() {
    this.innerHTML = `
      <h1>고양이 사진첩</h1>
        <main class="App">
          <nav class="Breadcrumb">
            ${this.history.join(' - ')}
          </nav>
        </main>
    `;

    const nodes = new Nodes({
      nodes: this.nodes,
      currentPath: this.currentPath,
      onClickFolder: this.handleClickFolder.bind(this),
      onClickPrev: this.handleClickPrev.bind(this),
    });

    this.querySelector('.App').appendChild(nodes);
  }
}

customElements.define('cat-app', App);
