// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { Number } from './Number'
import { Object } from './Object'
import { String } from './String'
import { Symbol } from './Symbol'
import { Undefined } from './Undefined'
import { Union } from './Union'

/** @internal */
export type PrimitiveTypes = Undefined | Null | Boolean | Number | String

/** @internal */
export type ComplexTypes = Object // | Array

/**
 * @internal
 * <https://www.rapidtables.com/math/symbols/Set_Symbols.html>
 */
export type SetTypes = Union // | Intersection | SubSet | SuperSet | Complement | Diff

export type AllTypes = PrimitiveTypes | ComplexTypes | SetTypes | Symbol
// | BigInt
