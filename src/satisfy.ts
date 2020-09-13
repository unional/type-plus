import * as types from './types'

export function satisfy<T extends types.AllTypes>(type: T, subject: unknown): subject is types.ConvertToActual<T> {
  switch (type.name) {
    case 'undefined':
      return typeof subject === type.name
    case 'null':
      return subject === null
    case 'boolean': {
      if (typeof subject !== 'boolean') return false
      const t = type as types.Boolean
      if (t === types.Boolean) return true
      return t.value === 'true' ? subject : !subject
    }
    case 'number': {
      if (typeof subject !== 'number') return false
      const t = type as types.Number
      if (t === types.Number) return true
      return subject === t.value
    }
    case 'string': {
      if (typeof subject !== 'string') return false
      const t = type as types.String
      if (t === types.String) return true
      return subject === t.value
    }
    case 'bigint': {
      if (typeof subject !== 'bigint') return false
      const t = type as types.BigInt
      if (t === types.BigInt) return true
      return subject === t.value
    }
  }
  return false
}
