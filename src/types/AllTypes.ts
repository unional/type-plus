import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { String } from './String'
import { Symbol } from './Symbol'
import { Undefined } from './Undefined'
import { Union } from './Union'

export type AllTypes = Undefined | Null | Boolean | Number | String
  | BigInt | Symbol | Union
