import { typeSym, valueSym } from '../utils/symbols'

export type FixedType<T extends string> = { [typeSym]: T }
export namespace FixedType {
  export type Expectation<T extends string> = { type: T }
}

export type ValueType<T extends string, Value> = { [typeSym]: T, [valueSym]: Value }
export namespace ValueType {
  export type Expectation<T extends string, Value> = { type: T, value: Value }
}

export type AnalysisType<T extends string, V = never> = { type: T, value?: V, fail?: true }
