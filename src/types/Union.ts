import { typeSym, valueSym } from '../utils'
import { ValueType } from './types'
import { AllTypes } from './AllTypes'
import { undef, Undefined } from './Undefined'
import { Never } from './Never'


export type Union<Values extends AllTypes[] = any[]> = ValueType<'union', Values>

/**
 * Create union type.
 */
function create<Values extends AllTypes[]>(...values: Values): Values['length'] extends 0
  ? Never : Values['length'] extends 1
  ? Values[0] : Union<Values> {
  if (values.length === 1) return values[0] as any
  const v = values.reduce<AllTypes[]>((p, v) => {
    if (v[typeSym] === 'union') {
      p.push(...(v as any)[valueSym])
    }
    else {
      p.push(v)
    }
    return p
  }, [])
  return { [typeSym]: 'union', [valueSym]: v } as any
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
