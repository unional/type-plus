import { FixedType, typeSym } from './typesInternal'

export type Any = FixedType<'any'> & Record<any, any>
export const any: Any = { [typeSym]: 'any' }
