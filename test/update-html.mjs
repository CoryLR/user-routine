
import fs from 'fs';
import { parse } from 'node-html-parser';
import open from 'open';
import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;
const spaCheckJsBlob = fs.readFileSync('spa-check.blob.js', 'utf8');
const tests = fs.readFileSync('test/tests.js', 'utf8');
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

if (process.argv.includes('-o')) {
  open('test/test.html');
} else {
  console.log('Test HTML updated, open to run tests:', `${__dirname}test.html`);
}
