export * from './CanAssign.js'
export type { Extendable, IsExtend, IsNotExtend, NotExtendable } from './Extends.js'
export type { If } from './If.js'
export type { IsEmptyObject } from './IsEmptyObject.js'
export * from './isType.js'
export type { And, Not, Or, Xor } from './logical.js'

export type IsLiteral<T extends number | string, Then = true, Else = false> = number extends T
	? Else
	: string extends T
	? Else
	: Then
