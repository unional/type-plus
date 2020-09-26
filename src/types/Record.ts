import { typeSym, valueSym } from '../utils'
import { AllTypes } from './AllTypes'
import { ValueType } from './types'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'

export type Record<Value extends AllTypes = any> = ValueType<'record', Value>

function create<Value extends AllTypes>(value: Value): Record<Value> {
  return { [typeSym]: 'record', [valueSym]: value }
}

export const record = {
  create,
  optional: {
    create<Value extends AllTypes>(value: Value): Union<[Record<Value>, Undefined]> {
      return union.create(create(value), undef) as any
    }
  }
}
