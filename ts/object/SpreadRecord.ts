import type { Omit } from '../object/index.js'

export type SpreadRecord<
A extends Record<any, any>,
B extends Record<any, any>
> = Omit<A, Extract<keyof A, keyof B>> & B
