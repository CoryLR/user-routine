// Test a Feature
userRoutine([
  'fill input.text Well',
  'fill input.count 3',
  'click button.duplicate',
  'exists .output Well Well Well',
])
// Display a Tutorial
userRoutine([
  'log Welcome to the demo',
  'comment .code-carousel Examples',
  'comment nav Links to docs & more',
], {
  message: 'Display a Tutorial',
  tutorialMode: true,
})
// Await a Process
userRoutine([
  'click button Long process',
  '!await .result processing...',
  'await .result process complete',
], { message: 'Await a Process' })