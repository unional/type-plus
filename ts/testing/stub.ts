import { AnyFunction } from '../function'
import { RecursivePartial } from '../object'

export type Stub<T> = T extends AnyFunction ? T : RecursivePartial<T>

export function stub<T>(stub: Stub<T>) {
  return stub as T
}
