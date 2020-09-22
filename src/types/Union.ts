import { typeSym, valueSym } from '../utils'
import { ValueType } from './types'
import { AllTypes } from './AllTypes'
import { undef, Undefined } from './Undefined'


export type Union<Values extends AllTypes[] = any[]> = ValueType<'union', Values>

/**
 * Create union type.
 */
function create<Values extends AllTypes[]>(...values: Values): Union<Values> {
  return {
    [typeSym]: 'union',
    [valueSym]: values
  }
}

export const union = {
  create,
  optional: {
    /**
     * Creates an optional unional type.
     */
    create<Values extends AllTypes[]>(...values: Values): Union<[...Values, Undefined]> {
      values.push(undef)
      return create(...values as any)
    }
  }
}
