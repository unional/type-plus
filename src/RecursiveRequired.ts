import { AnyRecord } from './any-types'

export type RecursiveRequired<T> = {
  [P in keyof T]-?:
  T[P] extends (infer U)[] ? RecursiveRequired<U>[] :
  T[P] extends AnyRecord ? RecursiveRequired<T[P]> :
  T[P];
}

