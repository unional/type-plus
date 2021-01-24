import { Equal } from '../assertion'

export * from './If'
export * from './logical'

export type IsLiteral<T extends number | string> = number extends T ?
  false :
  string extends T ? false : true

export type IsBoolean<T> = Equal<T, boolean> extends true ? true : false
