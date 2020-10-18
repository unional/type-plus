export type TypeSpec<T extends Type<string, any> = Type<string, any>, R = any> = {
  type: T,
  toAnalysis(options: AnalysisOptions, value: T['value'], subject: unknown): TypeAnalysis<T['type'], T['value']>,
  toNative(value: T['value']): R
}

export type AnalysisOptions = { strict: boolean, debug: boolean }

export type Type<T extends string, V> = {
  type: T,
  value: V
}

export type TypeAnalysis<T extends string, V = never> = { type: T, value?: V, fail?: true }

