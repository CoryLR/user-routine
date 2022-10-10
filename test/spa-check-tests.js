async function runTests() {
  await spaCheck([
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
    async () => { await new Promise(resolve => setTimeout(()=>{console.log(1);resolve()}, 4000))},
  ], { message: 'Testing features', messageShowInDOM: true });
  
  await spaCheck([
    'click does-not-exist',
    'invalidkeyword test',
    () => { throw new Error('This function should error') },
  ], { message: 'Testing error handling', messageShowInDOM: true, continueOnFailure: true });

  await spaCheck([
    'log Should halt after the following error',
    'click does-not-exist',
    'write h1  - This should not appear',
  ], { message: 'Testing graceful fail', messageShowInDOM: true });

  await spaCheck([
    'write #progress Done! Check the browser console for results.',
  ], { globalDelay: 0 });
}
runTests();