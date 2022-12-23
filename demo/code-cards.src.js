// Test a Feature
userRoutine([
  'fill input.text Hey',
  'fill input.count 3',
  'click button.duplicate',
  'exists .output Hey Hey Hey',
], { message: 'Test Feature' });
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