import { AnalysisType, ValueType } from './types'
import { AllType } from './AllType'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'

export type Tuple<Values extends AllType[] = any[]> = ValueType<'tuple', Values>

export namespace Tuple {
  export type Analysis<
    Value extends AllType.PrimitiveValues | AllType.Analysis = any
    > = AnalysisType<'tuple', Value[]>

  export type Head<T extends any[]> = T['length'] extends 0 ? never : T[0]
  export type Tail<T extends any[]> = T['length'] extends 0 ? never :
    T extends [any, ...infer Tail] ? Tail : T
}

/**
 * Creates a tuple type.
 */
function create<Value extends AllType, Values extends AllType[]>(
  value: Value,
  ...values: Values
): Tuple<[Value, ...Values]> {
  return {
    type: 'tuple',
    value: [value, ...values]
  }
}
export const tuple = {
  create,
  optional: {
    /**
     * Creates an optional tuple type.
     */
    create<Value extends AllType, Values extends AllType[]>(
      value: Value,
      ...values: Values
    ): Union<[Tuple<[Value, ...Values]>, Undefined]> {
      return union.create(create(value, ...values), undef)
    }
  }
}
