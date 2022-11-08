/* Create a Dry-Run template that's easy to copy-paste */
/* Run from root */

import fs from 'fs';
const dryRunJsBlob = fs.readFileSync('dist/dry-run.blob.js', 'utf8');
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
 * Dry-Run Template
 *
 * Run tests with zero setup by copy-pasting this file's contents
 * into a browser console or into client-side JavaScript
 *
 * Version: ${version}
 * Description: ${description}
*/

/**
 * Dry-Run examples, replace with your tests
*/
async function startDryRun() {
${addIndent(exampleTests)}
}

/*
${usage}
*/

/* Minified Dry-Run code, provides function 'dryRun' */ /* @ts-ignore */
${dryRunJsBlob}

startDryRun();
`;

fs.writeFileSync('dist/dry-run.template.js', template, { encoding: 'utf8', flag: 'w' });
