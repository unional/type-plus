import { object } from './Object'
import { any } from './Any'
import { array } from './Array'
import { boolean } from './Boolean'
import { nil } from './Null'
import { number } from './Number'
import { string } from './String'
import { symbol } from './Symbol'
import { tuple } from './Tuple'
import { undef } from './Undefined'
import { unknown } from './Unknown'
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
