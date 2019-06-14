export type UnionKeys<T> = T extends T ? keyof T : never
