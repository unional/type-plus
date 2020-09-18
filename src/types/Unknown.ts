import { FixedType } from './typesInternal'

export type Unknown = FixedType<'unknown'>
export const unknown: Unknown = { _type: 'unknown' }
