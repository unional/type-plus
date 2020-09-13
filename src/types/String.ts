export type String<Value extends string = string> = { name: 'string', value: Value }

export const string = {
  name: 'string' as const,
  value: '',
  /**
   * Creates a single value type.
   */
  val<Value extends string>(value: Value): String<Value> {
    // Cannot name this function as `const` because it is a reserved keyword.
    return { name: 'string', value }
  }
}
