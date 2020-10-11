export type TypeEquals<A, B> = A extends B ? B extends A ? true : false : false
