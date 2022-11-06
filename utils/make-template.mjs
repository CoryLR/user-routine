/* Create a SPA Routine template that's easy to copy-paste */
/* Run from root */

import fs from 'fs';
const spaRoutineJsBlob = fs.readFileSync('dist/spa-routine.blob.js', 'utf8');
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
 * SPA Routine Template
 *
 * Run tests with zero setup by copy-pasting this file's contents
 * into a browser console or into client-side JavaScript
 *
 * Version: ${version}
 * Description: ${description}
*/

/**
 * SPA Routine examples, replace with your tests
*/
async function runSpaRoutines() {
${addIndent(exampleTests)}
}

/*
${usage}
*/

/* Minified SPA Routine code, provides function 'spaRoutine' */ /* @ts-ignore */
${spaRoutineJsBlob}

runSpaRoutines();
`;

fs.writeFileSync('dist/spa-routine.template.js', template, { encoding: 'utf8', flag: 'w' });
