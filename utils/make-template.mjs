/* Create a SPA Check template that's easy to copy-paste */
/* Run from root */

import fs from 'fs';
const spaCheckJsBlob = fs.readFileSync('dist/spa-check.blob.js', 'utf8');
const exampleTests = fs.readFileSync('test/tests.js', 'utf8');

/* Extract usage documentation */
const readme = fs.readFileSync('README.md', 'utf8');
const usage = readme.match(/# (Usage[\s\S]*?)# /gm);
const packageJson = JSON.parse(fs.readFileSync('package.json'));
const version = packageJson.version;
const description = packageJson.description;

function addIndent(text, prepend = '  ') {
  return prepend + text.replaceAll(/\n/g, '\n' + prepend);
}

const template =`
/* 
 * SPA Check Template
 *
 * Run tests with zero setup by copy-pasting this file's contents
 * into a browser console or into client-side JavaScript
 *
 * Version: ${version}
 * Description: ${description}
*/

/**
 * SPA Check examples, replace with your tests
*/
async function runSpaChecks() {
${addIndent(exampleTests)}
}

/*
${usage}
*/

/* Minified SPA Check code, provides function 'spaCheck' */ /* @ts-ignore */
${spaCheckJsBlob}

runSpaChecks();
`;

fs.writeFileSync('dist/spa-check.template.js', template, { encoding: 'utf8', flag: 'w' });
