import { KeyTypes } from 'type-plus'
import { Widen } from '../utils'

/**
 * Creates a `Record<Key, Value>`
 */
export function record<K extends KeyTypes, V>(value?: Record<K, V>): Record<Widen<K>, V> {
  const r = Object.create(null)
  return value ? Object.assign(r, value) : r
}
