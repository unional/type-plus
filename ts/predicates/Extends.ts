export type Extendable<A, B> = A extends B ? A : never
export type NotExtendable<A, B> = A extends B ? never : A
export type IsExtend<A, B, Then = true, Else = false> = A extends B ? Then : Else
export type IsNotExtend<A, B, Then = true, Else = false> = A extends B ? Else : Then
