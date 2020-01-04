import { Omit } from './Omit'
import { Pick } from './pick'
import { UnionKeys } from './UnionKeys'

/**
 * Apply `Partial<>` on the selected properties.
 */
export type PartialPick<T, U extends UnionKeys<T>> = T extends T ? Omit<T, U> & Partial<Pick<T, U>> : never

/**
 * @deprecated replaced by `PartialOmit`
 */
export type PartialExcept<T, U extends UnionKeys<T>> = T extends T ? Pick<T, U> & Partial<Omit<T, U>> : never

/**
 * Apply `Partial<>` on all not selected properties.
 */
export type PartialOmit<T, U extends UnionKeys<T>> = T extends T ? Pick<T, U> & Partial<Omit<T, U>> : never
