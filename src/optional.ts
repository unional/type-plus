import { object } from './types'
import { any } from './types/Any'
import { array } from './types/Array'
import { boolean } from './types/Boolean'
import { nil } from './types/Null'
import { number } from './types/Number'
import { string } from './types/String'
import { symbol } from './types/Symbol'
import { tuple } from './types/Tuple'
import { undef } from './types/Undefined'
import { unknown } from './types/Unknown'
// import { bigint } from './BigInt'

export const optional = {
  any: any,
  array: array.optional,
  // bigint: bigint.optional,
  boolean: boolean.optional,
  null: nil.optional,
  number: number.optional,
  object: object.optional,
  string: string.optional,
  symbol: symbol.optional,
  tuple: tuple.optional,
  undefined: undef,
  unknown: unknown
}
