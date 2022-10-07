const fs = require('fs');
const parse = require('node-html-parser').parse;
const open = require('open');

const tests = `
new MiniTest([
  '',
  'val input[type="text"] Hello, world!',
  'val input[type="number"] 20',
  'click button',
  'includes pre world',
  'nav #far-down',
  '',
  'write #far-down  - Back up we go!',
  'exists body',
  'nav #',
  'write h3  - Test 1 completed successfully',
  'log Test 1 complete!',
], {message: 'Running Test 1'});
`

const jsMiniTestString = fs.readFileSync('MiniTest.blob.js', 'utf8')
const htmlDocument = parse(fs.readFileSync('test/test.html', 'utf8'));
htmlDocument.querySelector('script[data-tests]')
  .set_content(`${jsMiniTestString} ${tests}`);

fs.writeFileSync('test/test.html', htmlDocument.toString(), { encoding: 'utf8', flag: 'w' })

if (process.argv.includes('-o')) {
  open('test/test.html');
}