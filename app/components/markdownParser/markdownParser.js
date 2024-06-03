import { marked } from 'marked';
import { textSplitter } from '../textSplitter';

const renderer = {
  // add custom renderer functions
  // https://marked.js.org/using_pro#renderer
  paragraph(text) {
    const tempDiv = document.createElement('div')
    tempDiv.appendChild(textSplitter(text))
    return `<p>${tempDiv.innerHTML}</p>`;
  },
};

marked.use({ renderer });

export const parseMarkdown = (text) => marked.parse(text);
