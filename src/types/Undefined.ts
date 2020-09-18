import { FixedType, typeSym } from './typesInternal'

export type Undefined = FixedType<'undefined'>
export const undef: Undefined = { [typeSym]: 'undefined' }
