/**
 * @deprecated use `$Assignable`
 */
export type Extendable<A, B, Then = A, Else = never> = A extends B ? Then : Else
export type NotExtendable<A, B, Then = A, Else = never> = A extends B ? Else : Then
export type IsExtend<A, B, Then = true, Else = false> = A extends B ? Then : Else
export type IsNotExtend<A, B, Then = true, Else = false> = A extends B ? Else : Then
