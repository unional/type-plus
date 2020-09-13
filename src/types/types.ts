import { Tuple } from 'ts-toolbelt'
import { Any } from './Any'
import { Array } from './Array'
// import { BigInt } from './BigInt'
import { Boolean, False, True } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { Object } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { Undefined } from './Undefined'
import { Union } from './Union'
import { Unknown } from './Unknown'

/** @internal */
export type PrimitiveTypes = Undefined | Null | Boolean | Number | String

/** @internal */
export type ComplexTypes = Object | Array

/**
 * @internal
 * <https://www.rapidtables.com/math/symbols/Set_Symbols.html>
 */
export type SetTypes = Union // | Intersection | SubSet | SuperSet | Complement | Diff

export type AllTypes = PrimitiveTypes | ComplexTypes | SetTypes | Symbol | Unknown | Any// | BigInt

export type ConvertToActual<T extends AllTypes> =
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
  T extends Array ? ConvertToActual<T['type']>[] :
  T extends Union ? ConvertToActual.UnionDevice<T['values']>['result'] :
  // T extends BigInt ? T['value'] :
  unknown

export namespace ConvertToActual {
  export type UnionDevice<T extends AllTypes[]> = T['length'] extends 0
    ? { result: never }
    : {
      result: ConvertToActual<T[0]> | UnionDevice<Tuple.Drop<T, '1'>>['result']
    }
}
