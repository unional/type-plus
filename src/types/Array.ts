// import { BigInt } from './BigInt'
import { any, Any } from './Any'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { Obj as Obj, ObjectRecord } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { Tuple } from './Tuple'
import { typeSym, valueSym, ValueType } from '../utils'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'
import { Unknown, unknown } from './Unknown'

type AllTypes = Undefined | Null | Boolean | Number | String
  | Obj<any> | ObjectRecord<any>
  | Array<any> | Tuple<any>
  | Union<any>
  | Unknown | Any
  | Symbol // | BigInt

export type Array<Value extends AllTypes = AllTypes> = ValueType<'array', Value>

/**
 * Creates an array type.
 */
function create<Value extends AllTypes>(value: Value): Array<Value> {
  return {
    [typeSym]: 'array',
    [valueSym]: value
  }
}

export const array = Object.assign(create(any), {
  any,
  create,
  optional: Object.assign(union.create(create(any), undef), {
    /**
     * Creates an optional array type.
     */
    create<Value extends AllTypes>(value: Value): Union<[Array<Value>, Undefined]> {
      return union.create(create(value), undef)
    }
  }),
  unknown: create(unknown)
})
