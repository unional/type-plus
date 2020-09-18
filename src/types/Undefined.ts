import { FixedType } from './typesInternal'

export type Undefined = FixedType<'undefined'>
export const undef: Undefined = { _type: 'undefined' }
