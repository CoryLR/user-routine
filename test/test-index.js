const fs = require('fs');
const parse = require('node-html-parser').parse;
const open = require('open');

/* Run from repo root */

const spaCheckJsBlob = fs.readFileSync('spa-check.blob.js', 'utf8');
const tests = fs.readFileSync('test/spa-check-tests.js', 'utf8');
const combinedBlobAndTests = `\n${spaCheckJsBlob}${tests}`;

const htmlDocument = parse(fs.readFileSync('test/test.html', 'utf8'));
htmlDocument.querySelector('script[data-tests]')
  .set_content(combinedBlobAndTests);
fs.writeFileSync('test/test.html', htmlDocument.toString(), { encoding: 'utf8', flag: 'w' });

if (process.argv.includes('-o')) {
  open('test/test.html');
} else {
  console.log('Test HTML updated, open to run tests:', `${__dirname}/test.html`);
}
