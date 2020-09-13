// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { Object } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { Undefined } from './Undefined'
import { Union } from './Union'
import { Unknown } from './Unknown'

type AllTypes = Undefined | Null | Boolean | Number | String
| Symbol | Union<any> | Object<any> | Array<any> | Unknown


export type Tuple<T extends AllTypes[][]> = {
  name: 'tuple',
  types: [...T]
}

export const tuple = {
  name: 'tuple' as const,
  types: [],
  val<Value extends AllTypes[][]>(types: Value): Tuple<Value> {
    return {
      name: 'tuple',
      types
    }
  }
}
