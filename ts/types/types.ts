export type Type<T extends string, Value> = {
  type: T,
  value: Value
}

export type TypeAnalysis<T extends string, V = never> = {
  type: T,
  value?: V,
  fail?: true
}
