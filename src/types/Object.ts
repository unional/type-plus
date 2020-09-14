import { Array } from './Array'
// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { String } from './String'
import { Symbol } from './Symbol'
import { Undefined } from './Undefined'
import { Union } from './Union'

type AllTypes = Undefined | Null | Boolean | Number | String
  | Symbol | Union<any> | Array<any> | Object<any>
// | BigInt

export type Object<Values extends AllTypes[] = AllTypes[]> = {
  name: 'object',
  values: Values
}

function create<Values extends AllTypes[]>(...values: Values): Object<Values> {
  return { name: 'object', values }
}

export const object = { ...create(), create }
