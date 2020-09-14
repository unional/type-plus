// import { BigInt } from './BigInt'
import { any, Any } from './Any'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { Object } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { Undefined } from './Undefined'
import { Union } from './Union'
import { Unknown, unknown } from './Unknown'

type AllTypes = Undefined | Null | Boolean | Number | String
  | Symbol | Union | Object | Array<any> | Unknown | Any
// | BigInt

export type Array<Value extends AllTypes = AllTypes> = {
  name: 'array',
  value: Value
}

export const array = {
  name: 'array' as const,
  value: any,
  create<Value extends AllTypes>(value: Value): Array<Value> {
    return {
      name: 'array',
      value
    }
  },
  unknown: { name: 'array' as const, value: unknown }
}
