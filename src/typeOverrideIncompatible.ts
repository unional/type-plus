import { ANotB, AnyRecord } from './record'

export function typeOverrideIncompatible<A extends AnyRecord>() {
  return function <B extends AnyRecord>(source: B, override: ANotB<A, B>): A {
    return {
      ...source,
      ...override,
    } as any
  }
}
