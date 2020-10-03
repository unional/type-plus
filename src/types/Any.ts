import { typeSym } from '../utils'
import { FixedType } from './types'

export type Any = FixedType<'any'> & Record<any, any>
export namespace Any {
  export type Expectation = FixedType.Expectation<'any'>
  export type Analysis = { type: 'any' }
}
export const any: Any = { [typeSym]: 'any' }
