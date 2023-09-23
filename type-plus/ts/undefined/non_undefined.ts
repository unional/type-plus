// import type { HasUndefined } from './has_undefined.js'

// /**
//  * 🎭 *filter*
//  * 🔢 *customize*
//  *
//  * Filter to ensure that `T` is not `undefined`.
//  */
// export type NonUndefined<T, Else = never> = HasUndefined<T, { $then: Else, $else: T }>

export type NonUndefined<T, Else = never> = T extends undefined ? Else : T
