import { FixedType, typeSym } from '../utils'

export type Undefined = FixedType<'undefined'>
export const undef: Undefined = { [typeSym]: 'undefined' }
