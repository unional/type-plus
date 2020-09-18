import { FixedType } from './typesInternal'

export type Any = FixedType<'any'> & Record<any, any>
export const any: Any = { _type: 'any' }
