import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { String } from './String'
import { Symbol } from './Symbol'
import { Undefined } from './Undefined'

type AllTypes = Undefined | Null | Boolean | Number | String
  | BigInt | Symbol

export type Union<Values extends AllTypes[] = AllTypes[]> = {
  name: 'union',
  values: [...Values]
}

export const Union = {
  join<Values extends AllTypes[]>(...types: Values): Union<Values> {
    return {
      name: 'union',
      values: types
    }
  }
}
