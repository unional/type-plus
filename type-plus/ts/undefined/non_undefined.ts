// import type { HasUndefined } from './has_undefined.js'

// /**
//  * 🎭 *predicate*
//  * 🔢 *customize*
//  *
//  * Filter to ensure that `T` is not `undefined`.
//  */
// export type NonUndefined<T, Else = never> = HasUndefined<T, { $then: Else, $else: T }>

/**
 * 🌪️ *filter*
 * 🔢 *customize*
 *
 * Filter out `undefined`.
 *
 * ```ts
 * type R = NonUndefined<undefined> // never
 * type R = NonUndefined<undefined | 1> // 1
 * ```
 *
 * customize: replace `undefined` with `Replace`
 * ```ts
 * type R = NonUndefined<undefined, 2> // 2
 * type R = NonUndefined<undefined | 1, 2> // 1 | 2
 * ```
 */
export type NonUndefined<T, Replace = never> = T extends undefined ? Replace : T
