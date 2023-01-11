/* Create a User-Routine template that's easy to copy-paste */
/* Run from root */

import fs from 'fs';
const userRoutineJsBlob = fs.readFileSync('dist/user-routine.blob.js', 'utf8');

/* Extract usage documentation */
const readme = fs.readFileSync('README.md', 'utf8');
const usageRegex = RegExp(/# (Usage[\s\S]*?)(# Examples)/, 'gm');
const usage = usageRegex.exec(readme);
const packageJson = JSON.parse(fs.readFileSync('package.json'));
const version = packageJson.version;
const description = packageJson.description;

const template =`
/* 
 * User-Routine Template
 *
 * Run tests with zero setup by copy-pasting this file's contents into a 
 * browser console or into client-side JavaScript.
 *
 * Version: ${version}
 * Description: ${description}
*/

/**
 * This startUserRoutine function is called after the minified User-Routine
 * code at the bottom of the file. Replace the example with your own routine
 * and then copy-paste the whole file's contents into a browser console or
 * into client-side JavaScript.
 * 
 * You can also copy-paste just the minified code at the bottom of this file
 * and call the userRoutine function yourself.
 */
async function startUserRoutine() {

  // User-Routine example, replace with your own
  await userRoutine([
    'fill input.text Hey',
    'fill input.count 3',
    'click button.duplicate',
    'exists .output Hey Hey Hey',
    'log Done!',
  ], {
    message: 'Test a Feature'
  });

}

/*
${usage[1]}
*/

/* Minified User-Routine code, declares function 'userRoutine' */ /* @ts-ignore */
${userRoutineJsBlob}

startUserRoutine();
`;

fs.writeFileSync('dist/user-routine.template.js', template, { encoding: 'utf8', flag: 'w' });
