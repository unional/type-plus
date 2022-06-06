import type { Tail } from '../array/index.js'
import type { AllType } from './AllType.js'
// import type { KeyTypes } from '../object-key'
import type { Any } from './Any.js'
import type { Array } from './Array.js'
// import type { BigInt } from './BigInt.js'
import type { Boolean, False, True } from './Boolean.js'
import type { Null } from './Null.js'
import type { Number } from './Number.js'
import type { ObjectType } from './Object.js'
import type { Record } from './Record.js'
import type { String } from './String.js'
import type { Symbol } from './Symbol.js'
import type { Tuple } from './Tuple.js'
import type { Undefined } from './Undefined.js'
import type { Union } from './Union.js'
import type { Unknown } from './Unknown.js'

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
