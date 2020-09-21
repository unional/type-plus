import { FixedType, typeSym } from '../utils'

export type Unknown = FixedType<'unknown'>
export const unknown: Unknown = { [typeSym]: 'unknown' }
