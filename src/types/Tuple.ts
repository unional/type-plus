import { Any } from './Any'
import { Array } from './Array'
// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { ObjectType, ObjectRecord } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { typeSym, valueSym, ValueType } from '../utils'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'
import { Unknown } from './Unknown'

type AllTypes = Undefined | Null | Boolean | Number | String
  | ObjectType<any> | ObjectRecord<any>
  | Array<any> | Tuple<any>
  | Union<any> | Unknown | Any
  | Symbol // | BigInt

export type Tuple<Values extends AllTypes[] = any[]> = ValueType<'tuple', Values>

/**
 * Creates a tuple type.
 */
function create<Value extends AllTypes, Values extends AllTypes[]>(
  value: Value,
  ...values: Values
): Tuple<[Value, ...Values]> {
  return {
    [typeSym]: 'tuple',
    [valueSym]: [value, ...values]
  }
}
export const tuple = {
  create,
  optional: {
    /**
     * Creates an optional tuple type.
     */
    create<Value extends AllTypes, Values extends AllTypes[]>(
      value: Value,
      ...values: Values
    ): Union<[Tuple<[Value, ...Values]>, Undefined]> {
      return union.create(create(value, ...values), undef)
    }
  }
}
