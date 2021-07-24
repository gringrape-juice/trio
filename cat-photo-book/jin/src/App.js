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
    this.nodes = Cats[1];
    this.currentPath = name;

    this.history.push(name);

    this.render();
  }

  render() {
    const prevButton = `
      <div class="Node">
        <img src="./assets/prev.png" alt="prev">
      </div>
    `;

    const nodes = new Nodes({
      nodes: this.nodes,
      currentPath: this.currentPath,
      onClickFolder: this.handleClickFolder,
    });

    this.innerHTML = `
    <h1>고양이 사진첩</h1>
    <main class="App">
      <nav class="Breadcrumb">
        ${this.history.join(' - ')}
      </nav>
      <div class="Nodes">
        ${this.currentPath === 'root' ? '' : prevButton}
        ${this.nodes.map(({ type, name }) => `
          <div class="Node" type="${type}" name="${name}" >
            <img src="./assets/${type.toLowerCase()}.png" alt="${name}">
            <div>${name}</div>
          </div>`).join('')}
      </div>
    </main>
    `;

    this.querySelector('.Nodes').addEventListener('click', ({ target }) => {
      const { parentNode: currentNode } = target;

      if (currentNode.getAttribute('type') === 'DIRECTORY') {
        const name = currentNode.getAttribute('name');

        this.nodes = Cats[1];
        this.currentPath = name;

        this.history.push(name);

        this.render();
      }
    });
  }
}

customElements.define('cat-app', App);
