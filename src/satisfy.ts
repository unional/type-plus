import * as types from './types'

export function satisfy<T extends types.AllTypes>(type: T, subject: unknown): subject is types.ConvertToActual<T> {
  switch (type.name) {
    case 'undefined': return typeof subject === type.name
    case 'null': return subject === null
    case 'boolean': {
      if (typeof subject !== 'boolean') return false
      const t = type as types.Boolean
      if (t === types.Boolean) return true
      return t.value === 'true' ? subject : !subject
    }
    case 'number': return satisfyType(types.Number, type, subject)
    case 'string': return satisfyType(types.String, type, subject)
    case 'bigint': return satisfyType(types.BigInt, type, subject)
  }
  return false
}

function satisfyType(
  check: types.Number | types.String | types.BigInt,
  type: types.AllTypes,
  subject: unknown
) {
  if (typeof subject !== check.name) return false
  if (type === check) return true
  return subject === (type as any).value
}
