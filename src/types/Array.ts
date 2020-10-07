// import { BigInt } from './BigInt'
import { AllType } from './AllType'
import { TypeSpec } from './types'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'
import { unknown } from './Unknown'

export type Array<Value extends AllType = any> = TypeSpec<'array', Value>
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
