import { Any } from './Any'
import { Array } from './Array'
// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { ObjectType, ObjectRecord } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { Tuple } from './Tuple'
import { Undefined } from './Undefined'
import { Union } from './Union'
import { Unknown } from './Unknown'

export type AllTypes = Undefined | Null | Boolean | Number | String
  | ObjectType | ObjectRecord
  | Array | Tuple
  // <https://www.rapidtables.com/math/symbols/Set_Symbols.html>
  | Union // | Intersection | SubSet | SuperSet | Complement | Diff
  | Unknown | Any
  | Symbol // | BigInt
