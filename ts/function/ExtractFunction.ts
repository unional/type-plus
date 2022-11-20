import { AnyFunction } from './AnyFunction.js'

/**
 * Extract the function signature from a composit type T.
 *
 * @note does not work with function overloads.
 */
export type ExtractFunction<T extends AnyFunction> = T extends AnyFunction<infer P, infer R>
  ? (...args: P) => R : never

export function extractFunction<T extends AnyFunction>(fn: T) {
  return fn as any as ExtractFunction<T>
}
