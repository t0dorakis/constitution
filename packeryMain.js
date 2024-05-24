import "./packery.style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupTextExplorer } from "./components/textExplorer";
import { setupNavBar } from "./components/navBar";
import { setupThreeCanvas } from "./components/threeCanvas";
import Packery from "packery";
//import { packery_test } from "./components/packery_test";

console.log(Packery);

document.querySelector("#app").innerHTML = `
  <main>
    <div id="nav_bar"></div>
   
    <div class="absatz">
        <span class="grid-item">In</span> 
        <span class="grid-item">light</span> 
        <span class="grid-item">of</span> 
        <span class="grid-item">these</span> 
        <span class="grid-item">upheavals,</span> 
        <span class="grid-item">we,</span> 
        <span class="grid-item">the</span> 
        <span class="grid-item">denizens</span> 
        <span class="grid-item">of</span> 
        <span class="grid-item">this</span> 
        <span class="grid-item">brave</span> 
        <span class="grid-item">new</span> 
        <span class="grid-item">world,</span> 
        <span class="grid-item">pen</span> 
        <span class="grid-item">this</span> 
        <span class="grid-item">Manifesto</span> 
        <span class="grid-item">for</span> 
        <span class="grid-item">a</span> 
        <span class="grid-item">Multi-Modal</span> 
        <span class="grid-item">World</span> 
        <span class="grid-item">of</span> 
        <span class="grid-item">Humans</span> 
        <span class="grid-item">and</span> 
        <span class="grid-item">Machines</span> 
        <span class="grid-item">to</span> 
        <span class="grid-item">Bring</span> 
        <span class="grid-item">Order</span> 
        <span class="grid-item">Back</span> 
        <span class="grid-item">to</span> 
        <span class="grid-item">a</span> 
        <span class="grid-item">Former</span> 
        <span class="grid-item">Unregulated</span> 
        <span class="grid-item">Space</span> 
        <span class="grid-item">(Est.</span> 
        <span class="grid-item">2047).</span> 
        <span class="grid-item">Let</span> 
        <span class="grid-item">it</span> 
        <span class="grid-item">serve</span> 
        <span class="grid-item">as</span> 
        <span class="grid-item">a</span> 
        <span class="grid-item">beacon</span> 
        <span class="grid-item">of</span> 
        <span class="grid-item">wisdom,</span> 
        <span class="grid-item">caution,</span> 
        <span class="grid-item">and</span> 
        <span class="grid-item">clarity,</span> 
        <span class="grid-item">guiding</span> 
        <span class="grid-item">us</span> 
        <span class="grid-item">through</span> 
        <span class="grid-item">the</span> 
        <span class="grid-item">labyrinthine</span> 
        <span class="grid-item">landscape</span> 
        <span class="grid-item">of</span> 
        <span class="grid-item">coexistence</span> 
        <span class="grid-item">with</span> 
        <span class="grid-item">our</span> 
        <span class="grid-item">artificial</span> 
        <span class="grid-item">progeny.</span>
    </div>
    
  
  </main>
`;

// vanilla JS
var grid = document.querySelector('.absatz');

var pckry = new Packery( grid, {
  // options
  itemSelector: '.grid-item',
  gutter: 0,
  //columnWidth: 60,
  //rowHeight: 60,
});

grid.addEventListener( 'click', function( event ) {
  // filter for grid-item clicks
  if ( !event.target.classList.contains('grid-item') ) {
    return;
  }
  addTextToClickedGridItem(event.target);
  event.target.classList.toggle('grid-item--large');
  pckry.layout();
});

console.log(pckry);

function addTextToClickedGridItem(el){
  //el.insertAdjacentHTML(beforeend, `"so sehr sie sonst darauf achtete, jedem den Anblick von Gregors Zimmer zu ersparen, geradewegs zum Fenster und riß es, als ersticke sie fast, mit hastigen Händen auf,"`);
  el.innerHTML += `"so sehr sie sonst darauf achtete, jedem den Anblick von Gregors Zimmer zu ersparen, geradewegs zum Fenster und riß es, als ersticke sie fast, mit hastigen Händen auf,"`;
  el.style.paddingTop = "0.6em";
  el.style.color = "black";
  el.style.fontSize = "0.75em";
  el.style.lineHeight = "110%";
  //el.borderRadius = "0.5em";
}


//setupTextExplorer(document.querySelector("#text_explorer"));
//setupNavBar(document.querySelector("#nav_bar"));
//setupThreeCanvas(document.querySelector("#three_canvas"));
