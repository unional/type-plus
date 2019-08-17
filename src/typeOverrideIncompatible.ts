import { ANotB } from './ANotB';

export function typeOverrideIncompatible<A extends object>() {
  return function <B extends object>(source: B, override: ANotB<A, B>): A {
    return {
      ...source,
      ...override,
    } as any
  }
}
