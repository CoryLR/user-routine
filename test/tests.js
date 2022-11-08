
await userRoutine([
  'log Tests starting',
  'fill input.text Hello, world!',
  'value input.text',
  'value input.text Hello, world!',
  'fill input.count 2',
  'click button.duplicate',
  'exists pre.output-duplicate Hello, world! Hello, world! ',
  'append pre.output-duplicate Hello, world!',
  'exists pre.output-duplicate Hello, world! Hello, world! Hello, world!',
  'write .output-duplicate Hello Pluto!',
  '!exists .output-duplicate Hello World!',
  'click button.duplicate',
  'nav #',
  () => { if (logProgress) console.log('This is logging from a provided function!') },
  async () => { await new Promise(resolve => setTimeout(() => { resolve() }, 300)) },
  '!exists .output-process Processing...',
  'click button long process',
  '!await .output-process processing...',
  'await .output-process Process complete!',
], {
  message: 'Testing Features', globalDelay: 500,
});
