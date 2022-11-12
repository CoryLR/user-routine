// Test a Feature
userRoutine([
  'fill input.text Hi',
  'fill input.count 3',
  'click button.duplicate',
  'exists .output Hi Hi Hi',
])
// Display a Tutorial
userRoutine([
  'log Welcome to the demo',
  'comment .code-carousel Try one',
  'comment nav Link to docs here',
], {
  message: 'User Routine Tutorial',
  tutorialMode: true
})
// Await a Process
userRoutine([
  'click button Long process',
  '!await .result processing...',
  'await .result process complete',
], { message: 'Testing await' })