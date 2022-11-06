
const fs = require('fs')
const { parse } = require('node-html-parser');

const spaCheckJsBlob = fs.readFileSync('./dist/spa-check.blob.js', 'utf8');
const tests = fs.readFileSync('./test/tests.js', 'utf8');
const combinedBlobAndTests = `
${spaCheckJsBlob}
async function runSpaChecks() {
  ${tests}
  console.log('Done! See above for results.');
}
runSpaChecks();
`;

const htmlDocument = parse(fs.readFileSync('test/test.html', 'utf8'));
htmlDocument.querySelector('script[data-tests]')
  .set_content(combinedBlobAndTests);
fs.writeFileSync('test/test.html', htmlDocument.toString(), { encoding: 'utf8', flag: 'w' });

console.log('Test HTML updated, open to run tests:', `${__dirname}test.html`);
