import { typeSym } from '../utils'
import { FixedType } from './types'

export type Unknown = FixedType<'unknown'>
export const unknown: Unknown = { [typeSym]: 'unknown' }
