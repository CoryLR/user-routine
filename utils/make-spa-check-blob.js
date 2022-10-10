
/* Export a form of SpaCheck that's easy to copy-paste */
/* Run from root */

const fs = require('fs');

const jsSpaCheckString = fs.readFileSync('spa-check.js', 'utf8')
// const filteredjsSpaCheckString = jsSpaCheckString.split('\n').filter((line) => {
//   return !line.startsWith('exports');
// }).join('\n');

const filteredjsSpaCheckString = jsSpaCheckString.replace(/export/g, '')

fs.writeFileSync('spa-check.blob-uncompressed.js', filteredjsSpaCheckString, { encoding: 'utf8', flag: 'w' })

