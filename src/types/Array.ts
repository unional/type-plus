// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { Object } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { Undefined } from './Undefined'
import { Union } from './Union'

type AllTypes = Undefined | Null | Boolean | Number | String
  | Symbol | Union<any> | Object<any> | Array<any>
// | BigInt

export type Array<T extends AllTypes[] = AllTypes[]> = {
  name: 'array',
  fields: T
}

export const array = {
  name: 'array' as const,
  fields: [],
  val<T extends AllTypes[]>(fields: T): Array<T> {
    return {
      name: 'array',
      fields
    }
  }
}
