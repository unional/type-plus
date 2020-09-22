import { typeSym, valueSym } from '../utils/symbols'

export type FixedType<T extends string> = { [typeSym]: T }
export type ValueType<T extends string, Value> = { [typeSym]: T, [valueSym]: Value }
