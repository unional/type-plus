import { typeSym } from '../utils'
import { FixedType } from './types'

export type Never = FixedType<'never'>
export const never: Never = { [typeSym]: 'never' }
