import { typeSym, valueSym } from '../utils'
import { AllType } from './AllTypes'
import { ValueType } from './types'
import { undef } from './Undefined'


export type Union<Values extends AllType[] = any[]> = ValueType<'union', Values>

/**
 * Create union type.
 */
function create<
  Value extends AllType, Values extends AllType[]
>(value: Value, ...values: Values): Values['length'] extends 0
  ? Value : Union<[Value, ...Values]> {
  values.unshift(value)
  if (values.length === 1) return values[0] as any
  const v = values.reduce<AllType[]>((p, v) => {
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
    create<Value extends AllType, Values extends AllType[]>(value: Value, ...values: Values) {
      values.push(undef)
      return create(value, ...values)
    }
  }
}
