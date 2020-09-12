export type String<Value extends string = string> = { name: 'string', value: Value }

export namespace String {
  export const name = 'string'
  export const value = '' as string

  /**
   * Creates a single value type.
   */
  export function val<Value extends string>(value: Value): String<Value> {
    // Cannot name this function as `const` because it is a reserved keyword.
    return { name: 'string', value }
  }
}
