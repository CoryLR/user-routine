
import 'flickity';
import 'flickity-hash';
import '@fortawesome/fontawesome-free/js/fontawesome.min.js';
import '@fortawesome/fontawesome-free/js/regular.min.js';
import '@fortawesome/fontawesome-free/js/solid.min.js';
import hljs from 'highlight.js/lib/common';

import './style.css';
import { userRoutine } from '../../dist/user-routine.min';
import { runRegressionTests } from './regression-tests';

/* Enable userRoutine access from console */
window.userRoutine = userRoutine;

/* Add syntax highlighting */
hljs.highlightAll();

let processTime = 2000;
/*
 * Handle URL parameters:
 * test=quick-regression
 * test=full-regression
 */
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('test') === 'quick-regression') {
  runRegressionTests();
  processTime = 20;
} else if (urlParams.get('test') === 'full-regression') {
  runRegressionTests(500, true, true, true);
  processTime = 2000;
}

/* Mock app functionality */
document.querySelector('button.duplicate').addEventListener('click', () => {
  const outputArea = document.querySelector('pre.output-duplicate');
  outputArea.textContent = '';
  const text = document.querySelector('input.text').value;
  const count = document.querySelector('input.count').value;
  for (let i = 0; i < Number(count); i++) {
    outputArea.textContent += (text + " ")
  }
});
document.querySelector('button.process').addEventListener('click', () => {
  const processOutput = document.querySelector('.output-process');
  processOutput.textContent = '';
  processOutput.textContent = 'Processing...';
  setTimeout(() => {
    processOutput.textContent = 'Almost there...'
  }, processTime)
  setTimeout(() => {
    processOutput.textContent = 'Process complete!';
    processTime = 2000;
  }, processTime * 2)
});

