import { typeSym } from '../utils'
import { FixedType } from './types'

export type Any = FixedType<'any'> & Record<any, any>
export const any: Any = { [typeSym]: 'any' }
