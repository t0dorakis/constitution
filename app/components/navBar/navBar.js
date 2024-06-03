import "./navBar.styles.css";

export function setupNavBar(element) {
  element.classList.add("nav-bar");
  element.innerHTML = `
      <div class="nav-bar-item">
        <a href="/" data-link>Home</a>
      </div>
      <div class="nav-bar-item">
        <a href="/zoom" data-link>Zoom</a>
    </div>
    <div class="nav-bar-item">
        <a href="/packery" data-link>Packery</a>
    </div>
    <div class="nav-bar-item">
        <a href="/inserter" data-link>inserter</a>
    </div>
  `;
}
