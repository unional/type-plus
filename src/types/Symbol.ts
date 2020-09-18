export type Symbol<Value extends string = string> = { _type: 'symbol', value: Value }

function create<Value extends string>(value: Value): Symbol<Value> {
  return { _type: 'symbol', value }
}
export const symbol = create(undefined as unknown as string)
