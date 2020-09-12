import * as types from './types'

export function satisfy<T extends types.AllTypes>(type: T, subject: unknown): subject is types.ConvertToActual<T> {
  switch (type.name) {
    case 'undefined':
    case 'number':
    case 'string':
      return typeof subject === type.name
    case 'boolean': {
      if (typeof subject !== 'boolean') return false
      const b = type as types.Boolean
      if (b === types.Boolean) return true
      return b.value === 'true' ? subject : !subject
    }
    case 'null':
      return subject === null
  }
  return false
}
