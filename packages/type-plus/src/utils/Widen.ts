/**
 * ⚗️ *transform*
 *
 * Widen literal types to their respective parent types.
 *
 * ```ts
 * type R = Widen<1> // number
 * type R = Widen<true> // boolean
 * type R = Widen<'a'> // string
 * ```
 */
export type Widen<T> = T extends boolean ? boolean : T extends number ? number : T extends string ? string : T
