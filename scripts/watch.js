'use strict';

const cp = require('child_process');

let runner;
cp.spawn('tsc', ['-w'], { shell: true })
  .stdout.on('data', (data) => {
    const text = data.toString()
    process.stdout.write(text)
    if (/.*Found 0 errors/.test(text)) {
      if (!runner) {
        runner = cp.spawn('jest', ['--watch'], {
          stdio: 'inherit',
          shell: true
        })
      }
    }
  })
