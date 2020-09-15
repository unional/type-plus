import { any, Any } from './Any'
import { undef, Undefined } from './Undefined'
import { Union, union } from './Union'

export type String<Value extends string | Any = string | Any> = { name: 'string', value: Value }

/**
 * Creates a constant string type.
 */
function create<Value extends string | Any>(value: Value): String<Value> {
  // Cannot name this function as `const` because it is a reserved keyword.
  return { name: 'string', value }
}

export const string = {
  ...create(any),
  create,
  optional: {
    ...union.create(create(any), undef),
    /**
     * Creates an optional constant string type.
     */
    create<Value extends string>(value: Value): Union<[String<Value>, Undefined]> {
      return union.create(create(value), undef)
    }
  }
}
