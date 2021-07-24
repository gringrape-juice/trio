export default class Nodes extends HTMLElement {
  constructor({ nodes, currentPath, onClickFolder }) {
    super();
    this.nodes = nodes;
    this.currentPath = currentPath;
    this.handleClickFolder = onClickFolder;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const prevButton = `
      <div class="Node">
        <img src="./assets/prev.png" alt="prev">
      </div>
    `;

    this.innerHTML = `
      <div class="Nodes">
        ${this.currentPath === 'root' ? '' : prevButton}
        ${this.nodes.map(({ type, name }) => `
          <div class="Node" type="${type}" name="${name}" >
            <img src="./assets/${type.toLowerCase()}.png" alt="${name}">
            <div>${name}</div>
          </div>`).join('')}
      </div>
    `;

    this.addEventListener('click', ({ target }) => {
      const { parentNode: currentNode } = target;
      const [type, name] = ['type', 'name'].map((value) => currentNode.getAttribute(value));

      if (type === 'DIRECTORY') {
        this.handleClickFolder(name);
      }
    });
  }
}

customElements.define('cat-nodes', Nodes);
