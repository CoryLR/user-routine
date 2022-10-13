async function runSpaChecks() {
  await spaCheck([
    'wait 500',
    'val input[type="text"] Hello, world!',
    'val input[type="number"] 20',
    'click button',
    'exists pre hello',
    'nav #far-down',
    'write #far-down Back up we go!',
    'exists body',
    'nav #',
    () => { console.log('This is a regular function') },
    'log Next is an async function',
    async () => { await new Promise(resolve => setTimeout(() => { resolve() }, 1000)) },
    'click button long process',
    'await p.output>p',
    'await p process complete',
  ], { message: 'Testing features', messageShowInDOM: true, globalDelay: 250 });

  await spaCheck([
    'click does-not-exist',
    'invalidkeyword test',
    () => { throw new Error('This function should error') },
    'await does-not-exist',
    'await body>main this text should not exist anywhere'
  ], {
    message: 'Testing error handling (expect success: false)', messageShowInDOM: true,
    continueOnFailure: true, globalDelay: 100, awaitTimeout: 250,
  });

  await spaCheck([
    'log Should halt after the following error',
    'click does-not-exist',
    'write h1 This text should not appear',
  ], { message: 'Testing graceful fail (expect success: false)', messageShowInDOM: true });

  await spaCheck([
    'append #progress  Done! Check the browser console for results.',
  ], { globalDelay: 0, logUpdates: false, logResult: false });

  console.log('Done! See above for results.');
}
runSpaChecks();