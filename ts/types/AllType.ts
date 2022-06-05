import { Any } from './Any.js'
import { Array } from './Array.js'
// import { BigInt } from './BigInt.js'
import { Boolean } from './Boolean.js'
import { Null } from './Null.js'
import { Number } from './Number.js'
import { ObjectType } from './Object.js'
import { Record } from './Record'
import { String } from './String.js'
import { Symbol } from './Symbol.js'
import { Tuple } from './Tuple.js'
import { Undefined } from './Undefined'
import { Union } from './Union.js'
import { Unknown } from './Unknown.js'

export type AllType = Undefined | Null | Boolean | Number | String
  | ObjectType | Record
  | Array | Tuple
  // <https://www.rapidtables.com/math/symbols/Set_Symbols.html>
  | Union // | Intersection | SubSet | SuperSet | Complement | Diff
  | Unknown | Any
  | Symbol // | BigInt

export namespace AllType {
  export type PrimitiveValues = boolean | number | string // | bigint
  export type Analysis = Any.Analysis | Unknown.Analysis |
    Undefined.Analysis | Null.Analysis | Boolean.Analysis | Number.Analysis | String.Analysis |
    Symbol.Analysis |
    ObjectType.Analysis | Record.Analysis | Array.Analysis | Tuple.Analysis |
    Union.Analysis
}
