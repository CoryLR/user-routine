/* Create a User Routine template that's easy to copy-paste */
/* Run from root */

import fs from 'fs';
const userRoutineJsBlob = fs.readFileSync('dist/user-routine.blob.js', 'utf8');
const exampleTests = fs.readFileSync('test/tests.js', 'utf8');

/* Extract usage documentation */
const readme = fs.readFileSync('README.md', 'utf8');
const usageRegex = RegExp(/# (Usage[\s\S]*?)(# Examples)/, 'gm');
const usage = usageRegex.exec(readme);
const packageJson = JSON.parse(fs.readFileSync('package.json'));
const version = packageJson.version;
const description = packageJson.description;

function addIndent(text, prepend = '  ') {
  return prepend + text.replaceAll(/\n/g, '\n' + prepend);
}

const template =`
/* 
 * User Routine Template
 *
 * Run tests with zero setup by copy-pasting this file's contents
 * into a browser console or into client-side JavaScript
 *
 * Version: ${version}
 * Description: ${description}
*/

/**
 * User Routine examples, replace with your tests
*/
async function startUserRoutine() {
${addIndent(exampleTests)}
}

/*
${usage[1]}
*/

/* Minified User Routine code, provides function 'userRoutine' */ /* @ts-ignore */
${userRoutineJsBlob}

startUserRoutine();
`;

fs.writeFileSync('dist/user-routine.template.js', template, { encoding: 'utf8', flag: 'w' });
