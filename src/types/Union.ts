import { Array } from './Array'
import { Any } from './Any'
// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { Object } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { Undefined } from './Undefined'
import { Unknown } from './Unknown'

type AllTypes = Undefined | Null | Boolean | Number | String
  | Symbol | Union<any> | Object<any> | Array<any> | Unknown | Any
// | BigInt

export type Union<Values extends AllTypes[] = AllTypes[]> = {
  name: 'union',
  values: Values
}

export const union = {
  create<Values extends AllTypes[]>(...values: Values): Union<Values> {
    return {
      name: 'union',
      values
    }
  }
}
