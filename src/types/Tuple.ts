import { TypeAnalysis, Type } from './types'
import { AllType } from './AllType'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'

export type Tuple<Values extends AllType[] = any[]> = Type<'tuple', Values>

export namespace Tuple {
  export type Analysis<
    Value extends AllType.PrimitiveValues | AllType.Analysis = any
    > = TypeAnalysis<'tuple', Value[]>

  export type Head<T extends any[]> = T['length'] extends 0 ? never : T[0]
  export type Tail<T extends any[]> = T['length'] extends 0 ? never :
    T extends [any, ...infer Tail] ? Tail : T

  export type FindByProp<Tuple extends Array<{ [K in Key]: any }>, Key extends string, Value> = _FindByProp<Tuple, Key, Value>['result']

  /**
   * @internal
   */
  export type _FindByProp<Tuple extends Array<{ [K in Key]: any }>, Key extends string, Value> = Tuple['length'] extends 0
    ? { result: never }
    : { result: Value extends Tuple[0][Key] ? Tuple[0] : _FindByProp<Tail<Tuple>, Key, Value>['result'] }
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
