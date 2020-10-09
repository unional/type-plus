import { ANotB, AnyRecord } from './object'

export function typeOverrideIncompatible<A extends AnyRecord>() {
  return function <B extends AnyRecord>(source: B, override: ANotB<A, B>): A {
    return {
      ...source,
      ...override,
    } as any
  }
}
