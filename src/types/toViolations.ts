import { typeSym, valueSym } from '../utils'

export function toViolation(type: any): any {
  // console.debug('toViolation', type)
  const value = type[valueSym]
  if (value === undefined) return { type: type[typeSym] }
  if (Array.isArray(value)) return { type: type[typeSym], value: value.map(toViolation) }
  return { type: type[typeSym], value: value[typeSym] ? toViolation(value) : value }
}
