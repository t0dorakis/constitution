import { textArray } from "../../data/textArray.js";
import { dispatchEvent } from "../eventBus";
import "./textExplorer.styles.css";
import store from "../state/store";

/* shows the first two lines of text array a+b underneath each other. Whenever a user clicks anywhere
 * on the page, the text is updated in the way that the next object with a and b are between the first two lines.
 * the first two lines get a new css class "epoch-1", when we now repeat that the next two lines get the  class "epoch-1" and the previous change to "epoch-2".
 * and so on. The user can click until the textArray is over.
 */

/**
 * @param {HTMLDivElement} containerElement
 */
export function setupTextExplorer(containerElement) {
  let currentEpoch = 0;

  // init
  createTextElements(currentEpoch, containerElement);
  changeClasses(currentEpoch);
  // add event listener to the container
  containerElement.addEventListener("click", () => {
    if (currentEpoch < textArray.length - 1) {
      currentEpoch++;
      createTextElements(currentEpoch, containerElement);
      changeClasses(currentEpoch);
    }
  });
}

const handleHighlightClick = (type) => {
  store.getState().setVisibleScene(type);
  dispatchEvent(`highlight-${type}`, "test");
};
// adding this function to the window object so it can be used on basic html attributes

window.handleHighlightClick = handleHighlightClick;

// check if there is the word "AI" or "Human" in the text and if it is wrap those words in a span with the class highlight-ai or higlight-human
const highlightWords = (text) => {
  const words = text.split(" ");
  let newText = "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();
    const isHuman = word.includes("human") ? "human" : false;
    const isAi = word === "ai" || word.includes("machine") ? "ai" : false;
    const type = isHuman || isAi;
    if (isHuman || isAi) {
      newText += `<span class="highlight-${type}" onclick="handleHighlightClick('${type}')">${words[i]}</span> `;
    } else {
      newText += `${words[i]} `;
    }
  }
  return newText;
};

/**
 * @param {number} epoch
 * @param {HTMLDivElement} containerElement
 */
const createTextElements = (epoch, containerElement) => {
  const currentText = textArray[epoch];

  if (epoch === 0) {
    const rootEpochHolder = document.createElement("div");
    rootEpochHolder.classList.add("epoch-holder", "epoch-holder-0");
    containerElement.appendChild(rootEpochHolder);
  }

  // inside this placeholder we will add the text elements of the next epoch
  const nextEpochHolder = document.createElement("div");
  nextEpochHolder.classList.add("epoch-holder", `epoch-holder-${epoch + 1}`);

  // create the text elements
  const textA = document.createElement("p");
  textA.classList.add("text-a", `epoch-${epoch}`);
  textA.innerHTML = highlightWords(currentText.a);

  const textB = document.createElement("p");
  textB.classList.add("text-b", `epoch-${epoch}`);
  textB.innerHTML = highlightWords(currentText.b);
  // get epoch holder with epoch number
  const targetEpochHolder = document.querySelector(`.epoch-holder-${epoch}`);
  targetEpochHolder.append(textA, nextEpochHolder, textB);
};

/**
 * This function maps a value to a range of numbers (minRange, maxRange) and then to a range of values (minInput, maxInput)
 * @param {number} value
 * @param {object} options - minRange, maxRange, minInput, maxInput
 * @returns {number}
 */
function mapValueToRange(value, { minRange, maxRange, minInput, maxInput }) {
  // Linear interpolation formula
  const mappedValue =
    minRange +
    ((value - minInput) * (maxRange - minRange)) / (maxInput - minInput);

  return mappedValue;
}

const changeClasses = (epoch) => {
  // for the number of epochs, go though all the epoch holders and add/change a class "step-size-n"
  // so the first epoch holder in the first epoch will have a class "step-size-0" and then when a new epoch arrives it will have a class "step-size-1"
  // and so on. The user can click until the textArray is over.
  // take all element that start with epoch-holder
  for (let i = 0; i <= epoch; i++) {
    const element = document.querySelector(`.epoch-holder-${i}`);

    // remove the class "step-size-n"
    element.classList.forEach((cls) => {
      if (cls.startsWith("step-size-")) {
        element.classList.remove(cls);
      }
    });
    element.classList.add(`step-size-${epoch - i}`);

    // get direct child
    const textA = element.firstElementChild;
    const textB = element.lastElementChild;
    const baseSize = 12;

    // style the text elements the one with step-size-0 should not be styled
    // but if the step grows the text should be scaled up and moved up (text-a) and down (text-b)
    // the higher the step the bigger the text should be and the higher the text should be moved

    const negativeEpoch = epoch - i;
    // map scale to a range of 1 to 2 (i to epoch)

    const scale = mapValueToRange(negativeEpoch, {
      minRange: 1,
      maxRange: 2,
      minInput: 0,
      maxInput: 5,
    });

    textA.style.transform = `translateY(-${
      baseSize * negativeEpoch * scale
    }px) scale(${scale})`;
    textB.style.transform = `translateY(${
      baseSize * negativeEpoch * scale
    }px) scale(${scale})`;

    // color becomes grayer as the text gets bigger
    const color = mapValueToRange(negativeEpoch, {
      minRange: 1,
      maxRange: 0.6,
      minInput: 0,
      maxInput: epoch,
    });

    textA.style.color = `rgba(0, 0, 0, ${color})`;
    textB.style.color = `rgba(0, 0, 0, ${color})`;
  }
};
