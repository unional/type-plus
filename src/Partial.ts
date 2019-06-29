import { Pick } from './pick';
import { UnionKeys } from './UnionKeys';

export type PartialPick<T, U extends UnionKeys<T>> = T extends T ? Pick<T, Exclude<keyof T, U>> & Partial<Pick<T, U>> : never

/**
 * @deprecated replaced by `PartialOmit`
 */
export type PartialExcept<T, U extends UnionKeys<T>> = T extends T ? Pick<T, U> & Partial<Pick<T, Exclude<keyof T, U>>> : never

export type PartialOmit<T, U extends UnionKeys<T>> = T extends T ? Pick<T, U> & Partial<Pick<T, Exclude<keyof T, U>>> : never
