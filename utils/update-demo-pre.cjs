
const fs = require('fs')
const { parse } = require('node-html-parser');

const examplesString = fs.readFileSync('./demo/code-cards.src.js', 'utf8');

const examplesData = getExamplesData(examplesString);

let exampleJsArrayString = 'export const codeCardFunctionArray = [';
let exampleHtmlString = '';
for (let i = 0; i < examplesData.length; i++) {
  exampleJsArrayString += getJsArrayItemString(examplesData[i].code);
  exampleHtmlString += getHtmlCardFigureString(examplesData[i], i);
}
exampleJsArrayString += ']';

fs.writeFileSync('./demo/code-cards.min.js', exampleJsArrayString, { encoding: 'utf8', flag: 'w' });

const htmlDocument = parse(fs.readFileSync('./demo/index.html', 'utf8'));
htmlDocument.querySelector('[data-fill-tests]').set_content(exampleHtmlString);

/* Update index.html description */
const packageJson = JSON.parse(fs.readFileSync('package.json'));
const description = packageJson.description;
htmlDocument.querySelector('[data-fill-description]').set_content(description);

fs.writeFileSync('./demo/index.html', htmlDocument.toString(), { encoding: 'utf8', flag: 'w' });

function getJsArrayItemString(codeString) {
  return `async () => { await ${codeString} },`
}

function getHtmlCardFigureString(exampleData, i) {
  return `
      <figure id="${exampleData.id}">
        <div class="code-card" data-card-id="${i}">
          <div class="code-card-header">${exampleData.name}</div>
          <pre><code class="hljs language-javascript">${exampleData.code}</code></pre>
          <div class="buttons">
            <button class="run"><i class="fa-solid fa-play"></i> Run</button>
            <button class="copy-code" title="Copy Code"><i class="fa-regular fa-copy"></i></button>
            <button class="copy-link" title="Copy Link"><i class="fa-solid fa-link"></i></button>
          </div>
        </div>
      </figure>`;
}

/**
 * @param { string } examplesString
 * @returns { {name: string, code: string, id: string}[] }
 */
function getExamplesData(examplesString) {
  const examplesData = [];
  const examplesArray = examplesString.split('// ');
  examplesArray.forEach((exampleString) => {
    if (!exampleString) return;
    const exampleSplit = exampleString.split(/\n(.*)/s);
    examplesData.push({
      name: exampleSplit[0].trim(),
      code: exampleSplit[1].trim(),
      id: exampleSplit[0].trim().toLowerCase().replace(/\W/g, '-'),
    })
  });
  return examplesData;
}