/**
 * @internal
 */
export type FixedType<T extends string> = { _type: T }

/**
 * @internal
 */
export type ValueType<T extends string, Value> = { _type: T, _value: Value }
