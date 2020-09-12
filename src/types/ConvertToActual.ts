import { AllTypes } from './AllTypes'
import { Undefined } from './Undefined'
import { Boolean, True, False } from './Boolean'

export type ConvertToActual<T extends AllTypes> =
  T extends Undefined ? undefined :
  T extends True ? true :
  T extends False ? false :
  T extends Boolean ? boolean :
  unknown
