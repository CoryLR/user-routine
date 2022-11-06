
const { spaRoutine } = require('../lib/spa-routine.min');

// const { test } = require('../lib/test.min.js');

async function test2() {
  const out = await spaRoutine([]);
  console.log(out)
}

test2();

// test();