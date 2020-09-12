import { Brand } from '../nominal'

export type Boolean<
  V extends 'true' | 'false' | '' = ''
  > = V extends '' ? { name: 'boolean', value: 'true' | 'false' }
  : Brand<{ name: 'boolean', value: V }, V>

export namespace Boolean {
  export const name = 'boolean'
  export const value = 'false'
  export function fn(value: 'true'): True
  export function fn(value: 'false'): False
  export function fn(value: 'true' | 'false'): Boolean {
    return { name: 'boolean', value }
  }
}

export type True = Boolean<'true'>
export const True: True = { name: 'boolean', value: 'true' } as any

export type False = Boolean<'false'>
export const False: False = { name: 'boolean', value: 'false' } as any
