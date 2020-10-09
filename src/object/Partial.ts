import { UnionKeys } from '../UnionKeys'
import { Omit } from './omit'
import { Pick } from './pick'

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
