export type Head<T extends any[]> = T['length'] extends 0 ? never : T[0]
