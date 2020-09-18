import { typeSym, valueSym, ValueType } from './typesInternal'

export type Symbol<Value extends string = string> = ValueType<'symbol', Value>

function create<Value extends string>(value: Value): Symbol<Value> {
  return { [typeSym]: 'symbol', [valueSym]: value }
}
export const symbol = create(undefined as unknown as string)
