import { typeSym, valueSym } from '../utils'
import { ValueType } from './types'
import { AllType } from './AllTypes'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'

export type Tuple<Values extends AllType[] = any[]> = ValueType<'tuple', Values>

/**
 * Creates a tuple type.
 */
function create<Value extends AllType, Values extends AllType[]>(
  value: Value,
  ...values: Values
): Tuple<[Value, ...Values]> {
  return {
    [typeSym]: 'tuple',
    [valueSym]: [value, ...values]
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
