import { Any } from './Any'
import { Array } from './Array'
// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { ObjectType, ObjectRecord } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { Tuple } from './Tuple'
import { typeSym, valueSym, ValueType } from '../utils'
import { undef, Undefined } from './Undefined'
import { Unknown } from './Unknown'

type AllTypes = Undefined | Null | Boolean | Number | String
  | ObjectType<any> | ObjectRecord<any>
  | Array<any> | Tuple<any>
  | Union<any>
  | Unknown | Any
  | Symbol // | BigInt

export type Union<Values extends AllTypes[] = any[]> = ValueType<'union', Values>

/**
 * Create union type.
 */
function create<Values extends AllTypes[]>(...values: Values): Union<Values> {
  return {
    [typeSym]: 'union',
    [valueSym]: values
  }
}

export const union = {
  create,
  optional: {
    /**
     * Creates an optional unional type.
     */
    create<Values extends AllTypes[]>(...values: Values): Union<[...Values, Undefined]> {
      values.push(undef)
      return create(...values as any)
    }
  }
}
