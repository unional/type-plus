import { AnyFunction } from './any-types'
import { assertUnknown } from './assertUnknown'
import { isConstructor } from './isConstructor'

export function checkUnknown<T extends new (...args: any) => any>(subject: unknown, constructor: T): subject is InstanceType<T>
export function checkUnknown<T>(subject: unknown, handler: (s: T) => boolean): subject is T
export function checkUnknown<T>(subject: unknown, arg: unknown): subject is T {
  assertUnknown<AnyFunction>(arg)

  if (isConstructor(arg))
    return subject instanceof arg
  else
    return arg(subject)
}
