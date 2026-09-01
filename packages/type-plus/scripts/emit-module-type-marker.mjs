// Usage: node scripts/emit-module-type-marker.mjs <outDir> <commonjs|module>
//
// The package root declares `"type": "module"`, so every `.js` file under it is
// ESM by default -- including the CommonJS output in `cjs/`. Node then loads
// `cjs/index.js` as ESM, and its `require()` calls resolve against the caller
// instead of against the package, failing with MODULE_NOT_FOUND.
//
// A nearest-parent `package.json` in each output directory tells Node which
// module system that directory uses. `tsc` does not emit one, and `clean` wipes
// the directories, so it is written after each compile rather than checked in.
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const [outDir, type] = process.argv.slice(2)
if (!outDir || (type !== 'commonjs' && type !== 'module')) {
	console.error('usage: emit-module-type-marker.mjs <outDir> <commonjs|module>')
	process.exit(1)
}

const target = join(dirname(fileURLToPath(import.meta.url)), '..', outDir, 'package.json')
writeFileSync(target, `${JSON.stringify({ type }, null, 2)}\n`)
