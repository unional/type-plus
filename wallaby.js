module.exports = () => {
  return {
    'files': [
      { pattern: 'fixtures/**/*', instrument: false },
      { pattern: 'scripts/*', instrument: false },
      { pattern: 'package.json', instrument: false },
      { pattern: 'tsconfig.*', instrument: false },
      { pattern: '__komondor__/**/*', instrument: false },
      'src/**/*.ts',
      '!src/**/*.spec.ts'
    ],
    'tests': [
      'src/**/*.spec.ts'
    ],
    'env': {
      'type': 'node'
    },
    hints: {
      allowIgnoringCoverageInTests: true,
      ignoreCoverage: /istanbul ignore next/
    },
    setup(wallaby) {
      const fs = require('fs');
      if (fs.patched) return;
      const path = require('path');

      const writeFile = fs.writeFileSync;
      fs.writeFileSync = function(file, content) {
        if (/__komondor__/.test(file)) {
          writeFile(path.join(wallaby.localProjectDir, file.replace(wallaby.projectCacheDir, '')), content);
        }
        return writeFile.apply(this, arguments);
      }
      const mkdirSync = fs.mkdirSync;
      fs.mkdirSync = function (dir, mode) {
        if (/__komondor__/.test(dir)) {
          mkdirSync(path.join(wallaby.localProjectDir, dir.replace(wallaby.projectCacheDir, '')), mode);
        }
        return mkdirSync.apply(this, arguments);
      }
      fs.patched = true;
    },
    'testFramework': 'jest'
  }
}
