
import 'flickity';
import 'flickity-hash';
import '@fortawesome/fontawesome-free/js/fontawesome.min.js';
import '@fortawesome/fontawesome-free/js/regular.min.js';
import '@fortawesome/fontawesome-free/js/solid.min.js';
import hljs from 'highlight.js/lib/common';

import './style.css';
import { userRoutine } from '../../dist/user-routine.min';
import { runRegressionTests } from './regression-tests';

const state = {
  processTime: 2000,
}

function main() {

  /* Enable userRoutine access from console */
  window.userRoutine = userRoutine;

  /* Add syntax highlighting to code cards */
  hljs.highlightAll();

  /*
   * Handle URL parameters
   */
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('test') === 'quick-regression') {
    runRegressionTests();
    state.processTime = 20;
  } else if (urlParams.get('test') === 'full-regression') {
    runRegressionTests(500, true, true, true);
    state.processTime = 2000;
  }

  /* Add demo code card event listeners */
  document.querySelectorAll('button.copy-code').forEach((copyButton) => {
    copyButton.addEventListener('click', copyCodeOnClick)
  });
  document.querySelectorAll('button.copy-link').forEach((copyButton) => {
    copyButton.addEventListener('click', copyLinkOnClick)
  });

  /* Add mock-app event listeners */
  document.querySelector('button.duplicate').addEventListener('click', duplicateText);
  document.querySelector('button.process').addEventListener('click', startMockLongProcess);

}


/* Code Card Functions */

function copyCodeOnClick(event) {
  const codeCard = event.target.parentNode.parentNode;
  const codeCardId = Number(codeCard.getAttribute('data-card-id'));
  const code = codeCard.querySelector('pre > code').textContent;
  navigator.clipboard.writeText(code);
  userRoutine(
    `comment figure:nth-child(${codeCardId+1})>>button.copy-code ✔️ Code copied!`,
    { displayMessage: false, logProgress: false,
      logResult: true, simultaneousAllowed: true, keyboardControls: false,
      globalDelay: 0, displaySpeed: 1.5 }
  );
}

function copyLinkOnClick(event) {
  const codeCard = event.target.parentNode.parentNode;
  const codeCardId = Number(codeCard.getAttribute('data-card-id'));
  const figureId = codeCard.parentNode.id;
  const link = location.protocol + '//' + location.host + location.pathname + '#' + figureId;
  navigator.clipboard.writeText(link);
  userRoutine(
    `comment figure:nth-child(${codeCardId+1})>>button.copy-link ✔️ Link copied!`,
    { displayMessage: false, logProgress: false,
      logResult: true, simultaneousAllowed: true, keyboardControls: false,
      globalDelay: 0, displaySpeed: 1.5 }
  );
}

/* Mock App Functions */

function duplicateText() {
  const outputArea = document.querySelector('pre.output-duplicate');
  outputArea.textContent = '';
  const text = document.querySelector('input.text').value;
  const count = document.querySelector('input.count').value;
  for (let i = 0; i < Number(count); i++) {
    outputArea.textContent += (text + " ")
  }
}

function startMockLongProcess() {
  const processOutput = document.querySelector('.output-process');
  processOutput.textContent = '';
  processOutput.textContent = 'Processing...';
  setTimeout(() => {
    processOutput.textContent = 'Almost there...'
  }, state.processTime)
  setTimeout(() => {
    processOutput.textContent = 'Process complete!';
    state.processTime = 2000;
  }, state.processTime * 2)
}

main();
