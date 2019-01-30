/**
 * Exclude type U from properties in T.
 */
export type ExcludePropType<T, U> = {
  [k in keyof T]: Exclude<T[k], U>
}
