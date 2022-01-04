export * from './CanAssign'
export * from './Equal'
export * from './Extends'
export * from './If'
export * from './isType'
export * from './logical'
export * from './isEmptyObject'

import { IsExtend } from './Extends'

export type IsLiteral<T extends number | string, Then = true, Else = false> = number extends T ?
  Else :
  string extends T ? Else : Then

export type IsBoolean<T, Then = true, Else = false> = boolean extends T ? Then : Else

export type IsAny<T, Then = true, Else = false> = boolean extends IsExtend<T, string> ? Then : Else
