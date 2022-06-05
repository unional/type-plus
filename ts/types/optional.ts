import { object } from './Object.js'
import { any } from './Any.js'
import { array } from './Array.js'
import { boolean } from './Boolean.js'
import { nil } from './Null.js'
import { number } from './Number.js'
import { string } from './String.js'
import { symbol } from './Symbol.js'
import { tuple } from './Tuple.js'
import { undef } from './Undefined'
import { unknown } from './Unknown.js'
import { record } from './Record'
// import { bigint } from './types/BigInt'

export const optional = {
  any,
  array: array.optional,
  // bigint: bigint.optional,
  boolean: boolean.optional,
  null: nil.optional,
  number: number.optional,
  object: object.optional,
  record: record.optional,
  string: string.optional,
  symbol: symbol.optional,
  tuple: tuple.optional,
  undefined: undef,
  unknown
}
export const O = optional
