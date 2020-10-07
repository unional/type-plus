export type TypeSpec<T extends string, Native> = {
  type: Type<T, Native>,
  toAnalysis(type: Type<T, Native>): TypeAnalysis<T, Native>,
  toNative(type: Type<T, Native>): Native
}
export type Type<T extends string, V> = {
  /**
   * @internal
   */
  type: T,
  /**
   * @internal
   */
  value: V
}

export type TypeAnalysis<T extends string, V = never> = { type: T, value?: V, fail?: true }

