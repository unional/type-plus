export * from './CanAssign'
export type { Equal, IsEqual, IsNotEqual, NotEqual } from './Equal'
export type { Extendable, IsExtend, IsNotExtend, NotExtendable } from './Extends'
export type { If } from './If'
export * from './isType'
export type { And, Not, Or, Xor } from './logical'
export type { IsEmptyObject } from './IsEmptyObject'

import { IsExtend } from './Extends'

export type IsLiteral<T extends number | string, Then = true, Else = false> = number extends T ?
  Else :
  string extends T ? Else : Then

export type IsBoolean<T, Then = true, Else = false> = boolean extends T ? Then : Else

export type IsAny<T, Then = true, Else = false> = boolean extends IsExtend<T, string> ? Then : Else
