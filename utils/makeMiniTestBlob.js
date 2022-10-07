
/* Export a form of MiniTest that's easy to copy-paste */
/* Run from root */

const fs = require('fs');

const jsMiniTestString = fs.readFileSync('MiniTest.js', 'utf8')
const filteredjsMiniTestString = jsMiniTestString.split('\n').filter((line) => {
  return !line.startsWith('exports');
}).join('\n');

fs.writeFileSync('MiniTest.blob-working.js', filteredjsMiniTestString, { encoding: 'utf8', flag: 'w' })

