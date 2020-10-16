export type Extendable<A, B> = A extends B ? A : never
export type NotExtendable<A, B> = A extends B ? never : A
export type IsExtend<A, B> = A extends B ? true : false
export type IsNotExtend<A, B> = A extends B ? false : true
