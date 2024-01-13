import type { Eval, Id } from './index.js'

// 'pass input to functions'
type R = Eval<1, [Id]>
const r: R = 1
console.info(`${r} is 1`)
