export const typeSym: unique symbol = Symbol('type')
export const valueSym: unique symbol = Symbol('value')

export type FixedType<T extends string> = { [typeSym]: T }

export type ValueType<T extends string, Value> = { [typeSym]: T, [valueSym]: Value }
