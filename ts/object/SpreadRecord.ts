import { Omit } from '../object'

export type SpreadRecord<
A extends Record<any, any>,
B extends Record<any, any>
> = Omit<A, Extract<keyof A, keyof B>> & B
