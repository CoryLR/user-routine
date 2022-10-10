
new SpaCheck([
  '',
  'val input[type="text"] Hello, world!',
  'val input[type="number"] 20',
  'click button',
  'includes pre world',
  'nav #far-down',
  'write #far-down  - Back up we go!',
  'exists body',
  'nav #',
  () => { console.log('This was written by a custom function') },
], { message: 'Testing...', messageShowInDOM: true });

