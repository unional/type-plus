/**
 * 🌪️ *filter*
 *
 * Exclude from `T` those types that are assignable to `U`,
 * and replace them with `R`.
 *
 * This can be used as a drop-in replacement of the build-in `Exclude`.
 *
 * @example
 * ```ts
 * type R = Exclude<undefined, undefined> // never
 * type R = Exclude<undefined | 1, undefined> // 1
 *
 * type R = Exclude<undefined, undefined, 2> // 2
 * type R = Exclude<undefined | 1, undefined, 2> // 1 | 2
 * ```
 */
export type Exclude<T, U, R = never> = T extends U ? R : T
