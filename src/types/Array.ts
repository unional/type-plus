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

export type Array<T extends AllTypes = AllTypes> = {
  name: 'array',
  type: T
}

export const array = {
  name: 'array' as const,
  type: any,
  val<T extends AllTypes>(type: T): Array<T> {
    return {
      name: 'array',
      type
    }
  },
  unknown: { name: 'array' as const, type: unknown }
}
