// Test a Feature
userRoutine([
  'fill input.text Hey',
  'fill input.count 3',
  'click button.duplicate',
  'exists .output Hey Hey Hey',
  'log Done!',
], { message: 'Test a Feature' });
// Display a Tutorial
userRoutine([
  'log Welcome to the demo',
  'comment .code-carousel Examples',
  'comment nav Links to docs & more',
], {
  message: 'Display a Tutorial',
  tutorialMode: true,
});
// Await a Process
userRoutine([
  'click button Long process',
  'await .result process complete',
], { message: 'Await a Process' });
// Verify Content
userRoutine([
  'exists nav documentation',
  '!exist nav Rick Astley',
  'fill .text Bluebird',
  'value input.text Bluebird',
  '!value input.text Crow',
], { message: 'Verify Content' });
// Navigate With Hash-Links
userRoutine([
  'nav #bottom',
  'nav #',
  'nav #demos',
], {
  message: 'Navigate With Hash-Links'
});
// Examples of Failure
userRoutine([
  'click .does-not-exist',
  'value .count fake-number',
  'exists nav>>button Fake Link',
], {
  message: 'Examples of Failure',
  continueOnFailure: true,
});