import { AnyRecord } from './any-types'

// Source: https://stackoverflow.com/questions/41980195/recursive-partialt-in-typescript-2-1
export type RecursivePartial<T> = {
  [P in keyof T]?:
  T[P] extends (infer U)[] ? RecursivePartial<U>[] :
  T[P] extends AnyRecord ? RecursivePartial<T[P]> :
  T[P];
}
