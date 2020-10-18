/**
 * `UnionKeys<T>` will distribute keys of an union to individual types.
 * This should be used in conjuncture with distributive types.
 */
export type UnionKeys<T> = keyof T | (T extends unknown ? keyof T : never)
