import { AllTypes } from './AllTypes'
import { BigInt } from './BigInt'
import { Boolean, False, True } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { String } from './String'
import { Symbol } from './Symbol'
import { Undefined } from './Undefined'
import { Union } from './Union'
import { Tuple } from 'ts-toolbelt'

export type ConvertToActual<T extends AllTypes> =
  T extends Undefined ? undefined :
  T extends Null ? null :
  T extends True ? true :
  T extends False ? false :
  T extends Boolean ? boolean :
  T extends Symbol ? symbol :
  T extends Number ? T['value'] :
  T extends String ? T['value'] :
  T extends BigInt ? T['value'] :
  T extends Union ? ConvertToActual.UnionDevice<T['values']>['result'] :
  unknown

export namespace ConvertToActual {
  export type UnionDevice<T extends AllTypes[]> = T['length'] extends 0
    ? { result: never }
    : {
      result: ConvertToActual<T[0]> | UnionDevice<Tuple.Drop<T, '1'>>['result']
    }
}
