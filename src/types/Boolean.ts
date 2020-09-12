import { Brand } from '../Brand'

export type Boolean = { name: 'boolean', value: 'true' | 'false' }

export namespace Boolean {
  export const name = 'boolean'
  export const value = 'false'
  export function fn(value: 'true'): True
  export function fn(value: 'false'): False
  export function fn(value: 'true' | 'false'): Boolean {
    return { name: 'boolean', value }
  }
}

export type True = Brand<{ name: 'boolean', value: 'true' }, 'true'>
export const True: True = { name: 'boolean', value: 'true' } as any

export type False = Brand<{ name: 'boolean', value: 'false' }, 'false'>
export const False: False = { name: 'boolean', value: 'false' } as any
