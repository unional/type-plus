import { reduceByKey } from '../object-key'
import { typeSym, valueSym } from '../utils'

export function toViolation(type: any): any {
  // console.debug('toViolation', type)
  const value = type[valueSym]
  if (value === undefined) return { type: type[typeSym] }
  if (Array.isArray(value)) return { type: type[typeSym], value: value.map(toViolation) }
  if (typeof value !== 'object') return { type: type[typeSym], value }
  if (value[typeSym]) return { type: type[typeSym], value: toViolation(value) }
  return {
    type: type[typeSym], value: reduceByKey(value as Record<string, any>, (p, k) => {
      p[k] = toViolation(value[k])
      return p
    }, {} as Record<string, any>)
  }
}
