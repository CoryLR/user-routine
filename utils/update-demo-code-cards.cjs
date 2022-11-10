
const fs = require('fs')
// const { parse } = require('node-html-parser');

const examplesString = fs.readFileSync('./demo/src/code-card-examples.js', 'utf8');
const examplesArray = examplesString.split('// ');

const examplesData = [];
examplesArray.forEach((exampleString) => {
  if(!exampleString) return;
  const exampleSplit = exampleString.split(/\n(.*)/s);
  examplesData.push({
    name: exampleSplit[0].trim(),
    code: exampleSplit[1].trim(),
    id: exampleSplit[0].trim().replace(/\W/g, '-'),
  })
});

let exampleJsArrayString = 'export const codeCardFunctionArray = [';
let exampleHtmlString = '';
for (let i; i < examplesArray.length; i++) {
  exampleJsArrayString += `() => { ${examplesArray[i].code} }`;
  exampleHtmlString += `
  <figure id="${examplesArray[i].id}">
  <div class="code-card" data-card-id="${i}">
    <div class="code-card-header">${examplesArray[i].name}</div>
    <pre><code>${examplesArray[i].code}</code></pre>
    <div class="buttons">
      <button class="run"><i class="fa-solid fa-play"></i> Run</button>
      <button class="copy-code" title="Copy Code"><i class="fa-regular fa-copy"></i></button>
      <button class="copy-link" title="Copy Link"><i class="fa-solid fa-link"></i></button>
    </div>
  </div>
</figure>
  `
}