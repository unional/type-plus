import { AllTypes } from './AllTypes'
import { BigInt } from './BigInt'
import { Boolean, False, True } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { String } from './String'
import { Undefined } from './Undefined'

export type ConvertToActual<T extends AllTypes> =
  T extends Undefined ? undefined :
  T extends Null ? null :
  T extends True ? true :
  T extends False ? false :
  T extends Boolean ? boolean :
  T extends Number ? T['value'] :
  T extends String ? T['value'] :
  T extends BigInt ? T['value'] :
  unknown
