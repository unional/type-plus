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
