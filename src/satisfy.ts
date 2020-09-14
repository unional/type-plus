import * as types from './types'

export function satisfy<T extends types.AllTypes>(type: T, subject: unknown): subject is types.Generate<T> {
  switch (type.name) {
    case 'unknown':
    case 'any': return true
    case 'undefined':
    case 'symbol': return typeof subject === type.name
    case 'null': return subject === null
    case 'boolean': return satisfyBoolean(type as types.Boolean, subject)
    case 'number': return satisfyType(types.number, type, subject)
    case 'string': return satisfyType(types.string, type, subject)
    // case 'bigint': return satisfyType(types.bigint, type, subject)
    case 'union': return satisfyUnion(type as types.Union, subject)
    case 'object': return satisfyObject(type as types.Object, subject)
    case 'array': return satisfyArray(type as types.Array, subject)
  }
  return false
}

function satisfyBoolean(type: types.Boolean, subject: unknown) {
  if (typeof subject !== 'boolean') return false
  if (type === types.boolean) return true
  return type.value === 'true' ? subject : !subject
}

function satisfyType(
  baseType: types.Number | types.String, // | types.BigInt,
  type: types.AllTypes,
  subject: unknown
) {
  if (typeof subject !== baseType.name) return false
  if (type === baseType) return true
  return subject === (type as any).value
}

function satisfyUnion<T extends types.Union>(type: T, subject: unknown) {
  return type.values.some(t => satisfy(t, subject))
}

function satisfyArray<T extends types.Array>(type: T, subject: unknown) {
  if (!Array.isArray(subject)) return false
  return subject.every(s => satisfy(type.value, s))
}

function satisfyObject<T extends types.Object>(type: T, subject: unknown) {
  if (typeof subject !== 'object') return false
  if (subject === null) return false // techically wrong...
  if (Array.isArray(subject)) return false
  if (type === types.object as types.Object) return true
  return false
}
