import { IsExtend } from '../assertion'

export type IsAny<T, Then = true, Else = false> = boolean extends IsExtend<T, string> ? Then : Else
