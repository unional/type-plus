import { IsExtend } from '../assertion'

export type IsAny<T> = boolean extends IsExtend<T, string> ? true : false
