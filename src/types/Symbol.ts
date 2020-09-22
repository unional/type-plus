import { typeSym, valueSym, ValueType } from '../utils'
import { undef } from './Undefined'
import { union } from './Union'

export type Symbol<Value extends string = string> = ValueType<'symbol', Value>

function create<Value extends string>(value: Value): Symbol<Value> {
  return { [typeSym]: 'symbol', [valueSym]: value }
}

const any = create(undefined as unknown as string)

export const symbol = Object.assign(any, {
  optional: union.create(any, undef)
})
