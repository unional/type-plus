import { Widen } from '../utils/index.js'
import { AnyRecord } from './AnyRecord'
import { KeyTypes } from './KeyTypes.js'

/**
 * Creates a `Record<Key, Value>`
 */
export function record<K extends KeyTypes, V>(value?: Record<K, V>): Record<Widen<K>, V> {
  const r = Object.create(null) as AnyRecord
  return (value ? Object.assign(r, value) : r) as Record<Widen<K>, V>
}
