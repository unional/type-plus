export type BigInt<Value extends bigint = bigint> = { name: 'bigint', value: Value }

export namespace BigInt {
  export const name = 'bigint'
  export const value = 0n as bigint

  /**
   * Creates a single value type.
   */
  export function val<Value extends bigint>(value: Value): BigInt<Value> {
    // Cannot name this function as `const` because it is a reserved keyword.
    return { name: 'bigint', value }
  }
}
