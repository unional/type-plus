import type { Head, Last } from '../array/index.js'
import type { AnyFunction } from '../function/AnyFunction.js'

/**
 * compose functions
 */
export function compose<FS extends AnyFunction[]>(...fns: FS): (...args: Parameters<Head<FS>>) => ReturnType<Last<FS>> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (...args: any[]) => fns.reduce((args, fn) => [fn(...args)], args)[0]
}
