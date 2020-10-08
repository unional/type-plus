export type TypeSpec<T extends string, Native> = {
  type: Type<T, Native>,
  toAnalysis(type: Type<T, Native>): TypeAnalysis<T, Native>,
  toNative(type: Type<T, Native>): Native
}

export type Type<T extends string, Value> = {
  /**
   * @internal
   */
  type: T,
  /**
   * @internal
   */
  value: Value
}

export type TypeAnalysis<T extends string, V = never> = {
  type: T,
  value?: V,
  fail?: true
}
