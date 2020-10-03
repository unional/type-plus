// import { BigInt } from './BigInt'
import { typeSym, valueSym } from '../utils'
import { AllType } from './AllType'
import { ValueType } from './types'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'
import { unknown } from './Unknown'

export type Array<Value extends AllType = any> = ValueType<'array', Value>
export namespace Array {
  export type Expectation = ValueType.Expectation<'array', AllType.Expectation>
  export type Analysis = {
    type: 'array',
    value: AllType.PrimitiveValues | AllType.Analysis
    fail?: boolean
  }
}

/**
 * Creates an array type.
 */
function create<Value extends AllType>(value: Value): Array<Value> {
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
    create<Value extends AllType>(value: Value): Union<[Array<Value>, Undefined]> {
      return union.create(create(value), undef)
    }
  }),
  unknown: create(unknown)
})
