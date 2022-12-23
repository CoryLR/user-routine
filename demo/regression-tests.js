import { userRoutine } from '../dist/user-routine.min';

export async function runRegressionTests(
  globalDelay = 10,
  displayProgress = false,
  logProgress = false,
  interactiveTests = false,
) {

  const results = {}

  results.features = await userRoutine([
    'log Tests starting',
    'fill input.text Hello, world!',
    'value input.text',
    'value input.text Hello, world!',
    'fill input.count 2',
    'click button.duplicate',
    'exists pre.output Hello, world! Hello, world! ',
    'append pre.output Hello, world!',
    'exists pre.output Hello, world! Hello, world! Hello, world!',
    'write .output Hello Pluto!',
    '!exists .output Hello World!',
    'click button.duplicate',
    'nav #',
    () => { if(logProgress) console.log('This is logging from a provided function!') },
    async () => { await new Promise(resolve => setTimeout(() => { resolve() }, 300)) },
    '!exists .result processing...',
    'click button long process',
    '!await .result processing...',
    'await .result Process complete!',
  ], {
    message: 'Testing Features', globalDelay,
    displayProgress, logProgress, displaySpeed: 1,
    awaitTimeout: displayProgress ? 9000 : 1500,
  });

  results.errors = await userRoutine([
    'log Expect success: false',
    'click does-not-exist',
    'invalidkeyword test',
    () => { throw new Error('This function should error') },
    '!exists body',
    'await does-not-exist',
    'await body>main this text should not exist anywhere',
    'value input This should fail',
  ], {
    message: 'Testing Errors', globalDelay: 50, displayProgress,
    continueOnFailure: true, awaitTimeout: 150, logProgress
  });

  results.gracefulFail = await userRoutine([
    'log Expect success: false, should halt after next error',
    'click does-not-exist',
    'log If you see this, it did not work',
  ], {
    message: 'Testing Graceful Fail', globalDelay: 50,
    displayProgress, logProgress
  });

  if (interactiveTests) {
    results.tutorial = await userRoutine([
      'log Hey there, ready to get started?',
      'comment input.text First, enter some text here',
      'comment input.count Now put a number here',
      'click button.duplicate',
      'comment .output The output will appear here',
      'log All done! Click Next to finish.',
    ], { message: 'Tutorial Test', tutorialMode: true });
  }

  if (
    results.features.success === true // Features worked
    && results.errors.log > 9 // Should error at least 9 times
    && !results.gracefulFail.log.some((msg) => msg.toLowerCase().includes('did not work')) // String should be skipped
    && results.tutorial ? results.tutorial.success === true : true // Tutorial should work, if enabled
  ) {
    console.log('Regression Tests PASSED');
  } else {
    console.log('Regression Tests FAILED');
  }


}
