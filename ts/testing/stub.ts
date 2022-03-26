import { AnyFunction } from '../function'
import { RecursivePartial } from '../object'

export namespace stub {
  export type Param<T> = T extends AnyFunction ? T : RecursivePartial<T>
}

export function stub<T>(stub?: stub.Param<T>) {
  return stub as T
}
