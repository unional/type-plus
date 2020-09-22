import { KeyTypes } from '../object-key/KeyTypes'
import { typeSym, valueSym } from '../utils'
import { ValueType } from './types'
import { AllTypes } from './AllTypes'
import { number } from './Number'
import { string as str } from './String'
import { symbol as sym } from './Symbol'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'

export type ObjectType<
  Props extends Record<KeyTypes, AllTypes> = Record<KeyTypes, any>
  > = ValueType<'object', Props>

/**
 * create specific object type.
 */
function create<Props extends Record<KeyTypes, AllTypes>>(props: Props): ObjectType<Props> {
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
    create<Props extends Record<KeyTypes, AllTypes>>(props: Props): Union<[ObjectType<Props>, Undefined]> {
      return union.create(create(props), undef)
    },
    record<Value extends AllTypes>(value: Value): Union<[ObjectRecord<Value>, Undefined]> {
      return union.create(record(value), undef) as any
    }
  })
})

export const keys = union.create(str, number, sym)
