import { object } from './Object.js'
import { any } from './Any.js'
import { array } from './Array.js'
import { boolean } from './Boolean.js'
import { nil } from './Null.js'
import { number } from './Number.js'
import { string } from './String.js'
import { symbol } from './Symbol.js'
import { tuple } from './Tuple.js'
import { undef } from './Undefined.js'
import { unknown } from './Unknown.js'
import { record } from './Record.js'
// import { bigint } from './types/BigInt'

export const required = {
  any,
  array: array,
  // bigint: bigint,
  boolean: boolean,
  null: nil,
  number: number,
  object: object,
  record: record,
  string: string,
  symbol: symbol,
  tuple: tuple,
  undefined: undef,
  unknown
}
export const R = required
