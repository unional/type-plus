import { requiredDeep } from 'unpartial'
import { AnyFunction } from '../function'
import { RecursivePartial } from '../object'

export namespace stub {
  export type Param<T> = T extends AnyFunction ? T : RecursivePartial<T>
}

export function stub<T>(stub?: stub.Param<T>) {
  return stub as T
}

/**
 * builds a stub function
 */
stub.build = function build<T>(init?: stub.Param<T>) {
  return function (value?: stub.Param<T>) {
    return init
      ? stub<T>(requiredDeep(init as any, value as any) as any)
      : stub<T>(value)
  }
}
