import { Tuple as TTTuple } from 'ts-toolbelt'
// import { KeyTypes } from '../object-key'
import { Any } from './Any'
import { Array } from './Array'
// import { BigInt } from './BigInt'
import { Boolean, False, True } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { Object, ObjectRecord } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { Tuple } from './Tuple'
import { Undefined } from './Undefined'
import { Union } from './Union'
import { Unknown } from './Unknown'

export type AllTypes = Undefined | Null | Boolean | Number | String
  | Object<any> | ObjectRecord<any>
  | Array<any> | Tuple<any>
  // <https://www.rapidtables.com/math/symbols/Set_Symbols.html>
  | Union<any> // | Intersection | SubSet | SuperSet | Complement | Diff
  | Unknown | Any
  | Symbol // | BigInt

export type Generate<T extends AllTypes> =
  T extends Undefined ? undefined :
  T extends Null ? null :
  T extends True ? true :
  T extends False ? false :
  T extends Boolean ? boolean :
  T extends Symbol ? symbol :
  T extends Any ? any :
  T extends Unknown ? unknown :
  T extends Number ? T['_value'] :
  T extends String ? T['_value'] :
  T extends Object ? { [K in keyof T['_value']]: Generate<T['_value'][K]> } :
  T extends ObjectRecord ? { [K: string]: Generate<T['_value']> } :
  T extends Array ? Generate<T['_value']>[] :
  T extends Tuple ? Generate.TupleDevice<T['_value']>['result'] :
  T extends Union ? Generate.UnionDevice<T['_value']>['result'] :
  // T extends BigInt ? T['value'] :
  unknown

export namespace Generate {
  /**
   * @internal
   */
  export type UnionDevice<T extends AllTypes[]> = T['length'] extends 0
    ? { result: never }
    // @ts-ignore sometimes language service mark this as referencing itself
    : { result: Generate<T[0]> | UnionDevice<TTTuple.Drop<T, '1'>>['result'] }

  /**
   * @internal
   */
  export type TupleDevice<T extends AllTypes[]> = T['length'] extends 0
    ? { result: [] }
    // @ts-ignore sometimes language service mark this as referencing itself
    : { result: [Generate<T[0]>, ...TupleDevice<TTTuple.Drop<T, '1'>>['result']] }
}
