import { Type, TypeSpec } from './types'

export type Boolean<Value extends boolean = boolean> = Type<'boolean', Value>
export namespace Boolean {
  export type Analysis = { type: 'boolean', value?: boolean, fail?: true }
}

export type True = Boolean<true>
export type False = Boolean<false>

function create<Value extends boolean>(value: Value): Boolean<Value> {
  return { type: 'boolean', value }
}

const any = create(undefined as unknown as boolean)

export const booleanSpec: TypeSpec<'boolean', boolean> = {
  type: any,
  toAnalysis: ({ type, value }) => ({ type, value }),
  toNative: (value) => value as any
}
