import { AnyFunction } from './AnyFunction.js'

/**
 * Extract the function signature from a composit type T.
 */
export type ExtractFunction<T extends AnyFunction> = T extends AnyFunction<infer P, infer R>
  ? (...args: P) => R : never
