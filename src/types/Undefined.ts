import { typeSym } from '../utils'
import { FixedType } from './types'

export type Undefined = FixedType<'undefined'>
export const undef: Undefined = { [typeSym]: 'undefined' }
