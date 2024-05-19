import "./navBar.styles.css";

export function setupNavBar(element) {
  element.classList.add("nav-bar");
  element.innerHTML = `
      <div class="nav-bar-item">
        <a href="/">
          AI LAW — 2032
        </a>
      </div>
      <div class="seperator"></div>
      <div class="nav-bar-item">
        <a href="#">
          27483 ACTIVE USERS
        </a>
    </div>
  `;
}
