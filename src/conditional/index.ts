export * from './If'
export * from './logical'

export type IsLiteral<T extends number | string, Then = true, Else = false> = number extends T ?
  Else :
  string extends T ? Else : Then

export type IsBoolean<T, Then = true, Else = false> = boolean extends T ? Then : Else
