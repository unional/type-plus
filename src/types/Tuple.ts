import { typeSym, valueSym, ValueType } from '../utils'
import { AllTypes } from './AllTypes'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'

export type Tuple<Values extends AllTypes[] = any[]> = ValueType<'tuple', Values>

/**
 * Creates a tuple type.
 */
function create<Value extends AllTypes, Values extends AllTypes[]>(
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
    create<Value extends AllTypes, Values extends AllTypes[]>(
      value: Value,
      ...values: Values
    ): Union<[Tuple<[Value, ...Values]>, Undefined]> {
      return union.create(create(value, ...values), undef)
    }
  }
}
