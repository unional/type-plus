import { typeSym, valueSym, ValueType } from '../utils'
import { undef } from './Undefined'
import { union } from './Union'

export type Symbol<Value extends string = string> = ValueType<'symbol', Value>

function create<Value extends string>(value: Value): Symbol<Value> {
  return { [typeSym]: 'symbol', [valueSym]: value }
}
export const symbol = Object.assign(create(undefined as unknown as string), {
  optional: union.create(create(undefined as unknown as string), undef)
})
