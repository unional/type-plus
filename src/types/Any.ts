import { FixedType, typeSym } from '../utils'

export type Any = FixedType<'any'> & Record<any, any>
export const any: Any = { [typeSym]: 'any' }
