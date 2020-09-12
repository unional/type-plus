import { Boolean, False, True } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { String } from './String'
import { Undefined } from './Undefined'

export type AllTypes = Undefined | Null |
  Boolean | True | False |
  Number |
  String
