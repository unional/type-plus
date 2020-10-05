import { typeSym, valueSym } from '../utils'
import { ValueType } from './types'
import { undef, Undefined } from './Undefined'
import { Union, union } from './Union'

export type Boolean<Value extends boolean = boolean> = ValueType<'boolean', Value>
export namespace Boolean {
  export type Analysis = {
    type: 'boolean',
    value?: boolean,
    fail?: true
  }
}

export type True = Boolean<true>
export type False = Boolean<false>

function create<Value extends boolean>(value: Value): Boolean<Value> {
  return { [typeSym]: 'boolean', [valueSym]: value }
}

const any = create(undefined as unknown as boolean)
const t = create(true)
const f = create(false)

export const boolean = Object.assign(any, {
  any,
  true: t,
  false: f,
  create,
  optional: Object.assign(union.create(any, undef), {
    /**
     * Creates an optional boolean type.
     */
    create<Value extends true | false>(value: Value): Union<[Boolean<Value>, Undefined]> {
      return union.create(create(value), undef)
    },
    true: union.create(t, undef),
    false: union.create(f, undef),
  })
})
