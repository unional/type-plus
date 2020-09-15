import { Tuple as TTTuple } from 'ts-toolbelt'
import { KeyTypes } from '../object-key/KeyTypes'
import { Any } from './Any'
import { Array } from './Array'
// import { BigInt } from './BigInt'
import { Boolean, False, True } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { Object } from './Object'
import { String } from './String'
import { Tuple } from './Tuple'
import { Symbol } from './Symbol'
import { Undefined } from './Undefined'
import { Union } from './Union'
import { Unknown } from './Unknown'

/** @internal */
export type PrimitiveTypes = Undefined | Null | Boolean | Number | String

/** @internal */
export type ComplexTypes = Object<any> | Array<any> | Tuple<any>

/**
 * @internal
 * <https://www.rapidtables.com/math/symbols/Set_Symbols.html>
 */
export type SetTypes = Union // | Intersection | SubSet | SuperSet | Complement | Diff

export type AllTypes = PrimitiveTypes | ComplexTypes | SetTypes | Symbol | Unknown | Any// | BigInt

export type Generate<T extends AllTypes> =
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
  T extends Object<any> ? Generate.ObjectDevice<T['props']>['result'] :
  T extends Array ? Generate<T['value']>[] :
  T extends Tuple ? Generate.TupleDevice<T['values']>['result'] :
  T extends Union ? Generate.UnionDevice<T['values']>['result'] :
  // T extends BigInt ? T['value'] :
  unknown

export namespace Generate {
  /**
   * @internal
   */
  export type UnionDevice<T extends AllTypes[]> = T['length'] extends 0
    ? { result: never }
    : { result: Generate<T[0]> | UnionDevice<TTTuple.Drop<T, '1'>>['result'] }

  /**
   * @internal
   */
  export type ObjectDevice<T extends Record<KeyTypes, AllTypes> | undefined> = T extends undefined
    ? { result: Record<KeyTypes, any> }
    : MapProps<Exclude<T, undefined>>

  /**
   * @internal
   */
  export type MapProps<T extends Record<KeyTypes, AllTypes>> = {
    result: { [K in keyof T]: Generate<T[K]> }
  }

  /**
   * @internal
   */
  export type TupleDevice<T extends AllTypes[]> = T['length'] extends 1
    ? { result: [Generate<T[0]>] }
    : { result: [Generate<T[0]>, ...TupleDevice<TTTuple.Drop<T, '1'>>['result']] }
}
