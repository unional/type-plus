import { FixedType, typeSym } from './typesInternal'

export type Unknown = FixedType<'unknown'>
export const unknown: Unknown = { [typeSym]: 'unknown' }
