import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupTextExplorer } from "./components/textExplorer";

document.querySelector("#app").innerHTML = `
  <div class="container">
    <div id="text_explorer"></div>
  </div>
`;
setupTextExplorer(document.querySelector("#text_explorer"));
