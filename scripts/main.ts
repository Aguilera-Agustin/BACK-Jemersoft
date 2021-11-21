#!/usr/bin/env node

import programa from "../src/cli/programa";

try {
  (async () => {
    await programa.ejecutar(process.argv.slice(2));
  })();
} catch (error) {
  console.log(Error(error));
  // see why process.exit(1); was not used https://stackoverflow.com/questions/5266152/how-to-exit-in-node-js
  process.exitCode = 1;
}
