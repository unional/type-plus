import { any, Any } from './Any'
import { undef, Undefined } from './Undefined'
import { Union, union } from './Union'

export type Boolean<Value extends true | false | Any = true | false | Any> = {
  name: 'boolean', value: Value
}
export type True = Boolean<true>
export type False = Boolean<false>

function create<Value extends true | false | Any>(value: Value): Boolean<Value> {
  return { name: 'boolean', value }
}

export const boolean = {
  ...create(any),
  create,
  true: create(true),
  false: create(false),
  optional: {
    ...union.create(create(any), undef),
    /**
     * Creates an optional boolean type.
     */
    create<Value extends true | false | Any>(value: Value): Union<[Boolean<Value>, Undefined]> {
      return union.create(create(value), undef)
    },
    true: union.create(create(true), undef),
    false: union.create(create(false), undef),
  }
}
