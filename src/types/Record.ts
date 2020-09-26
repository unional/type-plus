import { typeSym, valueSym } from '../utils'
import { AllType } from './AllTypes'
import { ValueType } from './types'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'

export type Record<Value extends AllType = any> = ValueType<'record', Value>

function create<Value extends AllType>(value: Value): Record<Value> {
  return { [typeSym]: 'record', [valueSym]: value }
}

export const record = {
  create,
  optional: {
    create<Value extends AllType>(value: Value): Union<[Record<Value>, Undefined]> {
      return union.create(create(value), undef) as any
    }
  }
}
