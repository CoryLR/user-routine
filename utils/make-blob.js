
/* Export a minified form of SPA Check that's easier to copy-paste */
/* Run from root */

import fs from 'fs';
const jsSpaCheckString = fs.readFileSync('spa-check.js', 'utf8')
const filteredjsSpaCheckString = jsSpaCheckString.replace(/export/g, '')
fs.writeFileSync('spa-check.blob-uncompressed.js', filteredjsSpaCheckString, { encoding: 'utf8', flag: 'w' })

