import { UnionKeys } from '../UnionKeys'

export function hasProperty<T, P extends UnionKeys<T>>(value: T, prop: P): value is T & Record<P, T[P]> {
  return !!value[prop]
}
