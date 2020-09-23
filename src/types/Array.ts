// import { BigInt } from './BigInt'
import { typeSym, valueSym } from '../utils'
import { AllTypes } from './AllTypes'
import { ValueType } from './types'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'
import { unknown } from './Unknown'

export type Array<Value extends AllTypes = any> = ValueType<'array', Value>

/**
 * Creates an array type.
 */
function create<Value extends AllTypes>(value: Value): Array<Value> {
  return {
    [typeSym]: 'array',
    [valueSym]: value
  }
}

const any = create(undefined as unknown as any)

export const array = Object.assign({}, any, {
  any,
  create,
  optional: Object.assign(union.create(any, undef), {
    /**
     * Creates an optional array type.
     */
    create<Value extends AllTypes>(value: Value): Union<[Array<Value>, Undefined]> {
      return union.create(create(value), undef)
    }
  }),
  unknown: create(unknown)
})
