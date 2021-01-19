export type ArrayValue<T extends Array<any>> = T extends Array<infer Y> ? Y : never
