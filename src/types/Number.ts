import { Any, any } from './Any'
import { undef, Undefined } from './Undefined'
import { Union, union } from './Union'

export type Number<Value extends number | Any = number | Any> = { name: 'number', value: Value }

/**
 * Creates a single number type.
 */
function create<Value extends number | Any>(value: Value): Number<Value> {
  return { name: 'number', value }
}

export const number = {
  ...create(any),
  create,
  optional: {
    ...union.create(create(any), undef),
    /**
     * Creates an optional number constant type.
     */
    create<Value extends number>(value: Value): Union<[Number<Value>, Undefined]> {
      return union.create(create(value), undef)
    },
  }
}
