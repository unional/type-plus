import { KeyTypes } from '../object'
import { Tail } from './Tail'

export type MapToProp<A extends Record<any, any>[], P extends KeyTypes> = MapToProp._<A, P>['result']

export namespace MapToProp {
  export type _<A extends Record<any, any>[], P extends KeyTypes> = A['length'] extends 0
    ? never
    : A['length'] extends 1
    ? { result: A[0][P] }
    : { result: A[0][P] & _<Tail<A>, P>['result'] }
}
