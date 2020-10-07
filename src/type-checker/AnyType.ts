import { TypeAnalysis, Type, TypeSpec } from './types'

export type Any = Type<'any', undefined>
export namespace Any {
  export type Analysis = TypeAnalysis<'any'>
}
export const any: Any = { type: 'any', value: undefined }

export const anySpec: TypeSpec<'any', undefined> = {
  type: any,
  toAnalysis: ({ type, value }) => ({ type, value }),
  toNative: (value) => value as any
}
