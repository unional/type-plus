import * as types from '.'
import { typeSym, valueSym } from '../utils'
import { formatViolations } from './formatViolation'
import { Violation } from './Violation'

/**
 * Checks if the specified `subject` satisfies the `type`.
 * @return type guard (boolean). If the subject does not satisfies the type,
 * the details violations is collected in the `satisfy.violations` array.
 */
export function satisfy<T extends types.AllTypes>(type: T, subject: unknown): subject is types.Generate<T> {
  satisfy.violations = []
  const path: string[] = []
  return satisfyRecur(path, type, subject)
}
function satisfyRecur<T extends types.AllTypes>(path: Array<string | number>, type: T, subject: unknown): subject is types.Generate<T> {
  switch (type[typeSym]) {
    case 'unknown':
    case 'any': return true
    case 'undefined':
    case 'symbol': {
      const m = typeof subject === type[typeSym]
      if (!m) satisfy.violations.push({ path, expected: { type: type[typeSym] }, actual: subject })
      return m
    }
    case 'null': {
      const m = subject === null
      if (!m) satisfy.violations.push({ path, expected: { type: type[typeSym] }, actual: subject })
      return m
    }
    case 'boolean': return satisfyBoolean(path, type as types.Boolean, subject)
    case 'number': return satisfyType(types.number, type, subject)
    case 'string': return satisfyType(types.string, type, subject)
    // case 'bigint': return satisfyType(path, types.bigint, type, subject)
    case 'union': return satisfyUnion(type as types.Union, subject)
    case 'object': return satisfyObject(path, type as types.Object, subject)
    case 'record': return satisfyRecord(path, type as types.Record, subject)
    case 'array': return satisfyArray(path, type as types.Array, subject)
    case 'tuple': return satisfyTuple(path, type as types.Tuple, subject)
  }
}

/**
 * Violations of the `subject`.
 */
satisfy.violations = [] as Violation[]
satisfy.formatViolations = () => formatViolations(satisfy.violations)

function satisfyBoolean(path: Array<string | number>, type: types.Boolean, subject: unknown) {
  const match = typeof subject === 'boolean'
    && (type === types.boolean || type[valueSym] === subject)
  if (!match) {
    const expected = type[valueSym] === undefined
      ? { type: type[typeSym] }
      : { type: type[typeSym], value: type[valueSym] }
    satisfy.violations.push({ path, expected, actual: subject })
  }
  return match
}

function satisfyType(
  baseType: types.Number | types.String, // | types.BigInt,
  type: types.AllTypes,
  subject: unknown
) {
  if (typeof subject !== baseType[typeSym]) return false
  if (type === baseType) return true
  return subject === (type as any)[valueSym]
}

function satisfyUnion<T extends types.Union>(type: T, subject: unknown) {
  return type[valueSym].some(t => satisfy(t, subject))
}

function satisfyArray<T extends types.Array>(path: Array<string | number>, type: T, subject: unknown) {
  if (!Array.isArray(subject)) return false
  if (type[valueSym] === undefined) return true
  return subject.every((s, i) => satisfyRecur([...path, i], type[valueSym], s))
}

function satisfyObject<T extends types.Object>(path: Array<string | number>, type: T, subject: unknown) {
  if (typeof subject !== 'object') return false
  if (subject === null) return false // techically wrong...
  if (Array.isArray(subject)) return false
  if (type === types.object as types.Object) return true
  return Object.keys(type[valueSym]).every(p => satisfyRecur([...path, p], type[valueSym][p], (subject as any)[p]))
}

function satisfyTuple<T extends types.Tuple>(path: Array<string | number>, type: T, subject: unknown) {
  if (!Array.isArray(subject)) return false
  if (subject.length !== type[valueSym].length) return false
  return subject.every((s, i) => satisfyRecur([...path, i], type[valueSym][i], s))
}

function satisfyRecord(path: Array<string | number>, type: types.Record, subject: any) {
  if (typeof subject !== 'object') return false
  return Object.keys(subject).every(k => satisfyRecur([...path, k], type[valueSym], subject[k]))
}
