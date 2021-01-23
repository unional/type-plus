export * from './If'
export * from './logical'

export type IsLiteral<T extends number | string> = number extends T ?
  false :
  string extends T ? false : true
