export default class App extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <h1>고양이 사진첩</h1>
    <main class="App">
      <nav class="Breadcrumb">
        <div>root</div>
        <div>노란고양이</div>
      </nav>
      <div class="Nodes">
        <div class="Node">
          <img src="./assets/prev.png">
        </div>
        <div class="Node">
          <img src="./assets/directory.png">
          <div>2021/04</div>
        </div>
        <div class="Node">
          <img src="./assets/file.png">
          <div>하품하는 사진</div>
        </div>
      </div>
    </main>
    `;
  }
}

customElements.define('cat-app', App);
