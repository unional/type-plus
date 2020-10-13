export type Bit = 0 | 1

export type BitNot<X extends Bit> = X extends 0 ? 1 : 0
export type BitAnd<A extends Bit, B extends Bit> = A extends 1 ? B extends 1 ? 1 : 0 : 0
export type BitOr<A extends Bit, B extends Bit> = A extends 1 ? 1 : B extends 1 ? 1 : 0
export type BitXor<A extends Bit, B extends Bit> = A extends 1 ? BitNot<B> : B
