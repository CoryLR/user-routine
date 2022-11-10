// Test a feature
userRoutine([
  'fill input.text Hi',
  'fill input.count 3',
  'click button.duplicate',
  'exists .output Hi Hi Hi',
])
// Craft a tutorial
userRoutine([
  'log Welcome to the demo!',
  'comment .code-card An example',
  'comment .run Click Run to try',
  'log Click Next to finish'
], {
  message: 'User Routine Tutorial',
  tutorialMode: true
})
// Await a process
userRoutine([
  'click button Long process',
  'await !.output processing...',
  'await .output process complete',
], { message: 'Testing await' })