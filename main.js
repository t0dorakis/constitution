import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupTextExplorer } from "./components/textExplorer";
import { setupNavBar } from "./components/navBar";

document.querySelector("#app").innerHTML = `
  <main>
    <div id="nav_bar"></div>
    <div id="text_explorer"></div>
  </main>
`;
setupTextExplorer(document.querySelector("#text_explorer"));
setupNavBar(document.querySelector("#nav_bar"));
