export type ValueType<T extends string, Value> = { type: T, value: Value }

export type AnalysisType<T extends string, V = never> = { type: T, value?: V, fail?: true }
