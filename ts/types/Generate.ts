import { Tail } from '../array/index.js'
import { AllType } from './AllType.js'
// import { KeyTypes } from '../object-key'
import { Any } from './Any.js'
import { Array } from './Array.js'
// import { BigInt } from './BigInt.js'
import { Boolean, False, True } from './Boolean.js'
import { Null } from './Null.js'
import { Number } from './Number.js'
import { ObjectType } from './Object.js'
import { Record } from './Record'
import { String } from './String.js'
import { Symbol } from './Symbol.js'
import { Tuple } from './Tuple.js'
import { Undefined } from './Undefined'
import { Union } from './Union.js'
import { Unknown } from './Unknown.js'

export type Generate<T extends AllType> =
  T extends Undefined ? undefined :
  T extends Null ? null :
  T extends True ? true :
  T extends False ? false :
  T extends Boolean ? boolean :
  T extends Symbol ? symbol :
  T extends Any ? any :
  T extends Unknown ? unknown :
  T extends Number ? T['value'] :
  T extends String ? T['value'] :
  T extends ObjectType ? { [K in keyof T['value']]: Generate<T['value'][K]> } :
  T extends Record ? { [K: string]: Generate<T['value']> } :
  T extends Array ? Generate<T['value']>[] :
  T extends Tuple ? Generate._TupleDevice<T['value']>['result'] :
  T extends Union ? Generate._UnionDevice<T['value']>['result'] :
  // T extends BigInt ? T['value'] :
  unknown

export namespace Generate {
  export type _UnionDevice<T extends AllType[]> = T['length'] extends 0
    ? { result: never }
    // @ts-ignore sometimes language service mark this as referencing itself
    : { result: Generate<T[0]> | _UnionDevice<Tail<T>>['result'] }

  export type _TupleDevice<T extends AllType[]> = T['length'] extends 0
    ? { result: [] }
    // @ts-ignore sometimes language service mark this as referencing itself
    : { result: [Generate<T[0]>, ..._TupleDevice<Tail<T>>['result']] }
}
