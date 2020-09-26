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
