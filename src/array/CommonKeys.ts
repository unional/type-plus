import { Tail } from './Tail'

// export type CommonKeys<A extends Record<string, any>[]> = A['length'] extends 0
//   ? never : A['length'] extends 1
//   ? keyof A[0] : keyof A[0] & CommonKeys<Tail<A>>

/**
 * Gets the common keys of an array of records.
 */
export type CommonKeys<A extends Record<string, any>[]> = CommonKeys._<A>['result']

export namespace CommonKeys {
  export type _<A extends Record<string, any>[]> = A['length'] extends 0
    ? never
    : A['length'] extends 1
    ? { result: keyof A[0] }
    : { result: keyof A[0] & _<Tail<A>>['result'] }
}
