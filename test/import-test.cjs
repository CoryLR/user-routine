
const { spaCheck } = require('../lib/spa-check.min');

// const { test } = require('../lib/test.min.js');

async function test2() {
  const out = await spaCheck([]);
  console.log(out)
}

test2();

// test();