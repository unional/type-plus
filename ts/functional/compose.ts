import { Head, Last } from '../array'
import { AnyFunction } from '../function/AnyFunction'

/**
 * compose functions
 */
export function compose<FS extends AnyFunction[]>(...fns: FS): (...args: Parameters<Head<FS>>) => ReturnType<Last<FS>> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (...args: any[]) => fns.reduce((args, fn) => [fn(...args)], args)[0]
}
