import type { IsNever } from '../never/never_type.js'
import type { IsAny } from './any_type.js'

export type IsAnyOrNever<T, Then = true, Else = false> = IsNever<T, Then, IsAny<T, Then, Else>>
