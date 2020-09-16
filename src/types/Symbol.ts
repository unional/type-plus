export type Symbol<Value extends string = string> = { name: 'symbol', value: Value }

function create<Value extends string>(value: Value): Symbol<Value> {
  return { name: 'symbol', value }
}
export const symbol = create(undefined as unknown as string)
