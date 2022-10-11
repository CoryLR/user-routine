async function runTests() {
  await spaCheck([
    '',
    'val input[type="text"] Hello, world!',
    'val input[type="number"] 20',
    'click button',
    'exists pre hello',
    'nav #far-down',
    'write #far-down Back up we go!',
    'exists body',
    'nav #',
    () => { console.log('This is a regular function') },
    'log Next is an async function, waiting 1.5 seconds...',
    async () => { await new Promise(resolve => setTimeout(()=>{resolve()}, 1500))},
    'click button.process',
    'log Awaiting span.output>p...',
    'await span.output>p',
  ], { message: 'Testing features', messageShowInDOM: true, globalDelay: 250 });
  
  await spaCheck([
    'click does-not-exist',
    'invalidkeyword test',
    () => { throw new Error('This function should error') },
    'await does-not-exist',
    'await body>main this text should not exist anywhere'
  ], { message: 'Testing error handling', messageShowInDOM: true, continueOnFailure: true, awaitTimeout: 600 });

  await spaCheck([
    'log Should halt after the following error',
    'click does-not-exist',
    'write h1 This should not appear',
  ], { message: 'Testing graceful fail', messageShowInDOM: true });

  await spaCheck([
    'append #progress  Done! Check the browser console for results.',
  ], { globalDelay: 0 });
}
runTests();