// istanbul ignore file
export type BigInt<Value extends bigint = bigint> = { name: 'bigint', value: Value }

export const bigint = {
  name: 'bigint' as const,
  value: 0n,
  /**
   * Creates a single value type.
   */
  create<Value extends bigint>(value: Value): BigInt<Value> {
    // Cannot name this function as `const` because it is a reserved keyword.
    return { name: 'bigint', value }
  }
}
