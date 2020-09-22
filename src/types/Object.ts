import { KeyTypes } from '../object-key/KeyTypes'
import { Any } from './Any'
import { Array } from './Array'
// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { number, Number } from './Number'
import { string as str, String } from './String'
import { symbol as sym, Symbol } from './Symbol'
import { Tuple } from './Tuple'
import { typeSym, valueSym, ValueType } from '../utils'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'
import { Unknown } from './Unknown'

type AllTypes = Undefined | Null | Boolean | Number | String
  | Obj<any> | ObjectRecord<any>
  | Array<any> | Tuple<any>
  | Union<any>
  | Unknown | Any
  | Symbol
// | BigInt

export type Obj<
  Props extends Record<KeyTypes, AllTypes> = Record<KeyTypes, AllTypes>
  > = ValueType<'object', Props>

/**
 * create specific object type.
 */
function create<Props extends Record<KeyTypes, AllTypes>>(props: Props): Obj<Props> {
  return { [typeSym]: 'object', [valueSym]: props }
}

export type ObjectRecord<Value extends AllTypes = any> = ValueType<'record', Value>

function record<Value extends AllTypes>(value: Value): ObjectRecord<Value> {
  return { [typeSym]: 'record', [valueSym]: value }
}

const any = create(undefined as any)

export const object = Object.assign(any, {
  any,
  create,
  record,
  optional: Object.assign(union.create(any, undef), {
    /**
     * Creates an optional object type.
     */
    create<Props extends Record<KeyTypes, AllTypes>>(props: Props): Union<[Obj<Props>, Undefined]> {
      return union.create(create(props), undef)
    },
    record<Value extends AllTypes>(value: Value): Union<[ObjectRecord<Value>, Undefined]> {
      return union.create(record(value), undef) as any
    }
  })
})

export const keys = union.create(str, number, sym)
