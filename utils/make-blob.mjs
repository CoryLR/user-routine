
/* Export a minified form of SPA Check that's easier to copy-paste */
/* Run from root */

import fs from 'fs';
const jsSpaCheckString = fs.readFileSync('spa-check.js', 'utf8');
const filteredJsSpaCheckString = jsSpaCheckString.replaceAll('export', '').replaceAll('this', 'that').replace(/ +/g, ' ');
const finalJsSpaCheckString = 'var that={};' + filteredJsSpaCheckString
fs.writeFileSync('spa-check.blob-uncompressed.js', finalJsSpaCheckString, { encoding: 'utf8', flag: 'w' });
