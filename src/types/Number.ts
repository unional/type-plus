export type Number<Value extends number = number> = { name: 'number', value: Value }

export namespace Number {
  export const name = 'number'
  export const value = 0 as number

  /**
   * Creates a single value type.
   */
  export function val<Value extends number>(value: Value): Number<Value> {
    // Cannot name this function as `const` because it is a reserved keyword.
    return { name: 'number', value }
  }
}
