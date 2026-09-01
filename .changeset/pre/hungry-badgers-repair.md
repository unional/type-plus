---
'type-plus': patch
---

Ship a `cjs/package.json` marker so `require('type-plus')` works again.

The package root declares `"type": "module"`, so Node treated the CommonJS
output in `cjs/` as ESM. `cjs/index.js` then resolved its own `require()`
calls against the caller instead of against the package, and every CJS
consumer failed with `Cannot find module './array/array_plus.js'`.

The build now writes `cjs/package.json` (`{"type":"commonjs"}`) and, for
symmetry, `esm/package.json` (`{"type":"module"}`) after each compile. The
7.x build emitted the CJS marker via `buddy ts build cjs`; moving to a plain
`tsc` emit dropped it.
