import { Any } from './Any'
import { Array } from './Array'
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
  | Symbol | Union<any> | Object<any> | Array<any> | Unknown | Any

export type Tuple<Values extends AllTypes[] = AllTypes[]> = {
  name: 'tuple',
  values: Values
}

export const tuple = {
  name: 'tuple' as const,
  types: [],
  create<Value extends AllTypes, Values extends AllTypes[]>(
    value: Value,
    ...values: Values
  ): Tuple<[Value, ...Values]> {
    return {
      name: 'tuple',
      values: [value, ...values]
    }
  }
}
