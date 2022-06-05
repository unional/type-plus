// import { BigInt } from './BigInt.js'
import { AllType } from './AllType.js'
import { Type } from './types.js'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union.js'
import { unknown } from './Unknown.js'

export type Array<Value extends AllType = any> = Type<'array', Value>
export namespace Array {
  export type Analysis<
    Value extends AllType.PrimitiveValues | AllType.Analysis = any
    > = {
      type: 'array',
      value?: Value,
      fail?: true
    }
}

/**
 * Creates an array type.
 */
function create<Value extends AllType>(value: Value): Array<Value> {
  return {
    type: 'array',
    value
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
