import { spaRoutine } from '../../dist/spa-routine.min';

export async function runRegressionTests(
  globalDelay = 10,
  displayProgress = false,
  logProgress = false,
) {

  await spaRoutine([
    'log Hey there, ready to get started?',
    'comment button.duplicate First, click this button...',
  ], { message: 'Tutorial Test', tutorialMode: true });

  await spaRoutine([
    'log Tests starting',
    'fill input.text Hello, world!',
    'fill input.count 2',
    'click button.duplicate',
    'exists pre.output-duplicate Hello, world! Hello, world! ',
    'append pre.output-duplicate Hello, world!',
    'exists pre.output-duplicate Hello, world! Hello, world! Hello, world!',
    'write .output-duplicate Hello Pluto!',
    '!exists .output-duplicate Hello World!',
    'click button.duplicate',
    'nav #',
    () => { if(logProgress) console.log('This is logging from a provided function!') },
    async () => { await new Promise(resolve => setTimeout(() => { resolve() }, 300)) },
    '!exists .output-process Processing...',
    'click button long process',
    '!await .output-process processing...',
    'await .output-process Process complete!',
  ], {
    message: 'Testing Features', globalDelay,
    displayProgress, logProgress, displaySpeed: 2,
    awaitTimeout: displayProgress ? 9000 : 1500,
  });

  await spaRoutine([
    'log Expect success: false',
    'click does-not-exist',
    'invalidkeyword test',
    () => { throw new Error('This function should error') },
    '!exists body',
    'await does-not-exist',
    'await body>main this text should not exist anywhere'
  ], {
    message: 'Testing Errors', globalDelay: 50, displayProgress,
    continueOnFailure: true, awaitTimeout: 150, logProgress
  });

  await spaRoutine([
    'log Expect success: false, should halt after next error',
    'click does-not-exist',
    'log If you see this, it did not work',
  ], {
    message: 'Testing Graceful Fail', globalDelay: 50,
    displayProgress, logProgress
  });

}
