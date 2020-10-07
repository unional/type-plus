export type TypeSpec<T extends string, Value> = { type: T, value: Value }

export type AnalysisType<T extends string, V = never> = { type: T, value?: V, fail?: true }
