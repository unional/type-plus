import { Tuple as TTTuple } from 'ts-toolbelt'
import { valueSym } from '../utils'
import { AllType } from './AllType'
// import { KeyTypes } from '../object-key'
import { Any } from './Any'
import { Array } from './Array'
// import { BigInt } from './BigInt'
import { Boolean, False, True } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { ObjectType } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { Tuple } from './Tuple'
import { Undefined } from './Undefined'
import { Union } from './Union'
import { Record } from './Record'
import { Unknown } from './Unknown'

export type Generate<T extends AllType> =
  T extends Undefined ? undefined :
  T extends Null ? null :
  T extends True ? true :
  T extends False ? false :
  T extends Boolean ? boolean :
  T extends Symbol ? symbol :
  T extends Any ? any :
  T extends Unknown ? unknown :
  T extends Number ? T[typeof valueSym] :
  T extends String ? T[typeof valueSym] :
  T extends ObjectType ? { [K in keyof T[typeof valueSym]]: Generate<T[typeof valueSym][K]> } :
  T extends Record ? { [K: string]: Generate<T[typeof valueSym]> } :
  T extends Array ? Generate<T[typeof valueSym]>[] :
  T extends Tuple ? Generate.TupleDevice<T[typeof valueSym]>['result'] :
  T extends Union ? Generate.UnionDevice<T[typeof valueSym]>['result'] :
  // T extends BigInt ? T['value'] :
  unknown

export namespace Generate {
  /**
   * @internal
   */
  export type UnionDevice<T extends AllType[]> = T['length'] extends 0
    ? { result: never }
    // @ts-ignore sometimes language service mark this as referencing itself
    : { result: Generate<T[0]> | UnionDevice<TTTuple.Drop<T, '1'>>['result'] }

  /**
   * @internal
   */
  export type TupleDevice<T extends AllType[]> = T['length'] extends 0
    ? { result: [] }
    // @ts-ignore sometimes language service mark this as referencing itself
    : { result: [Generate<T[0]>, ...TupleDevice<TTTuple.Drop<T, '1'>>['result']] }
}
