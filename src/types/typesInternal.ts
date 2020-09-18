export const typeSym: unique symbol = Symbol('type')
export const valueSym: unique symbol = Symbol('value')

/**
 * @internal
 */
export type FixedType<T extends string> = { [typeSym]: T }

/**
 * @internal
 */
export type ValueType<T extends string, Value> = { [typeSym]: T, [valueSym]: Value }
