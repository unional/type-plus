import { typeSym, valueSym, ValueType } from './typesInternal'
import { undef, Undefined } from './Undefined'
import { Union, union } from './Union'

export type Boolean<Value extends boolean = boolean> = ValueType<'boolean', Value>

export type True = Boolean<true>
export type False = Boolean<false>

function create<Value extends boolean>(value: Value): Boolean<Value> {
  return { [typeSym]: 'boolean', [valueSym]: value }
}

export const boolean = {
  ...create(undefined as unknown as boolean),
  create,
  true: create(true),
  false: create(false),
  optional: {
    ...union.create(create(undefined as unknown as boolean), undef),
    /**
     * Creates an optional boolean type.
     */
    create<Value extends true | false>(value: Value): Union<[Boolean<Value>, Undefined]> {
      return union.create(create(value), undef)
    },
    true: union.create(create(true), undef),
    false: union.create(create(false), undef),
  }
}
