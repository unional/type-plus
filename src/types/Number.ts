export type Number<Value extends number = number> = { name: 'number', value: Value }

export const Number = {
  name: 'number' as const,
  value: 0,
  /**
   * Creates a single value type.
   */
  val<Value extends number>(value: Value): Number<Value> {
    // Cannot name this function as `const` because it is a reserved keyword.
    return { name: 'number', value }
  }
}
