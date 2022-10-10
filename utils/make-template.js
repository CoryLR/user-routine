/* Create a SPA Check template that's easy to copy-paste */
/* Run from root */

import fs from 'fs';
const spaCheckJsBlob = fs.readFileSync('spa-check.blob.js', 'utf8');
const exampleTests = fs.readFileSync('test/spa-check-tests.js', 'utf8');

/* Extract usage documentation */
const readme = fs.readFileSync('README.md', 'utf8');
const usage = readme.match(/# (Usage[\s\S]*?)#/gm);

const template =`
/* SPA Check template for quick copy-pasting */

/* SPA Check minified, provides function 'spaCheck': */
${spaCheckJsBlob}
/* Example running multiple sequential tests using async/await: */
${exampleTests}

/*
${usage}
*/

`;

fs.writeFileSync('spa-check.template.js', template, { encoding: 'utf8', flag: 'w' });
