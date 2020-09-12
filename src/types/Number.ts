export type Number<Value extends number = number> = { name: 'number', value: Value }

export namespace Number {
  export const name = 'number'
  export const value = 0

  export function fn<N extends number>(value: N): Number<N> {
    return { name: 'number', value }
  }
}
