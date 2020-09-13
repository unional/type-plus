import * as types from './types'

export function satisfy<T extends types.AllTypes>(type: T, subject: unknown): subject is types.ConvertToActual<T> {
  switch (type.name) {
    case 'undefined':
    case 'symbol': return typeof subject === type.name
    case 'null': return subject === null
    case 'boolean': return satisfyBoolean(type as types.Boolean, subject)
    case 'number': return satisfyType(types.Number, type, subject)
    case 'string': return satisfyType(types.String, type, subject)
    case 'bigint': return satisfyType(types.BigInt, type, subject)
    case 'union': return satisfyUnion(type as types.Union, subject)
  }
  return false
}

function satisfyBoolean(type: types.Boolean, subject: unknown) {
  if (typeof subject !== 'boolean') return false
  if (type === types.Boolean) return true
  return type.value === 'true' ? subject : !subject
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

function satisfyUnion<T extends types.Union>(type: T, subject: unknown) {
  return type.values.some(t => satisfy(t, subject))
}
