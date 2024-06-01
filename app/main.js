import "./global.css";
import { setupNavBar } from "./components/navBar";
import { router } from "./router";

document.querySelector("#root").innerHTML = `
  <main>
    <div id="nav_bar"></div>
    <div id="app"></div>
  </main>`;

setupNavBar(document.querySelector("#nav_bar"));
router.init();
