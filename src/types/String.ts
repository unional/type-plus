import { undef, Undefined } from './Undefined'
import { Union, union } from './Union'

export type String<Value extends string = string> = { name: 'string', value: Value }

/**
 * Creates a constant string type.
 */
function create<Value extends string>(value: Value): String<Value> {
  // Cannot name this function as `const` because it is a reserved keyword.
  return { name: 'string', value }
}

export const string = {
  ...create(undefined as unknown as string),
  create,
  optional: {
    ...union.create(create(undefined as unknown as string), undef),
    /**
     * Creates an optional constant string type.
     */
    create<Value extends string>(value: Value): Union<[String<Value>, Undefined]> {
      return union.create(create(value), undef)
    }
  }
}
