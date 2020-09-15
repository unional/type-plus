import { undef, Undefined } from './Undefined'
import { Union, union } from './Union'

export type Number<Value extends number = number> = { name: 'number', value: Value }

/**
 * Creates a single number type.
 */
function create<Value extends number>(value: Value): Number<Value> {
  return { name: 'number', value }
}

export const number = {
  ...create(0 as number),
  create,
  optional: {
    ...union.create(create(0 as number), undef),
    /**
     * Creates an optional number constant type.
     */
    create<Value extends number>(value: Value): Union<[Number<Value>, Undefined]> {
      return union.create(create(value), undef)
    },
  }
}
