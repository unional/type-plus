// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { String } from './String'
import { Symbol } from './Symbol'
import { Undefined } from './Undefined'
import { Union } from './Union'

type AllTypes = Undefined | Null | Boolean | Number | String
  | Symbol | Union<any> | Object<any>
// | BigInt

export type Object<T extends AllTypes[] = AllTypes[]> = {
  name: 'object',
  fields: T
}

export const object = {
  val<T extends AllTypes[]>(fields: T): Object<T> {
    return {
      name: 'object',
      fields
    }
  }
}
