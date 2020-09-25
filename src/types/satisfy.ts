import * as types from '.'
import { typeSym, valueSym } from '../utils'
import { formatViolations } from './formatViolation'
import { toViolation } from './toViolations'
import { Violation } from './Violation'

/**
 * Checks if the specified `subject` satisfies the `type`.
 * @return type guard (boolean). If the subject does not satisfies the type,
 * the details violations is collected in the `satisfy.violations` array.
 */
export function satisfy<T extends Exclude<types.AllTypes, types.Never>>(type: T, subject: unknown): subject is types.Generate<T> {
  const violation = satisfyRecur([], type, subject)
  satisfy.violations = violation ? [violation] : []
  return !violation
}
function satisfyRecur<T extends types.AllTypes>(path: Array<string | number>, type: T, subject: unknown): Violation | undefined {
  switch (type[typeSym]) {
    case 'unknown':
    case 'any': return undefined
    case 'undefined':
    case 'symbol': {
      return typeof subject === type[typeSym]
        ? undefined
        : { path, expected: toViolation(type), actual: subject }
    }
    case 'null': {
      return subject === null
        ? undefined
        : { path, expected: toViolation(type), actual: subject }
    }
    case 'boolean': return satisfyBoolean(path, type as types.Boolean, subject)
    case 'number': return satisfyType(path, types.number, type as types.Number, subject)
    case 'string': return satisfyType(path, types.string, type as types.String, subject)
    // case 'bigint': return satisfyType(path, types.bigint, type as types.BigInt, subject)
    case 'union': return satisfyUnion(path, type as types.Union, subject)
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

function satisfyBoolean(path: Array<string | number>, type: types.Boolean, actual: unknown) {
  return typeof actual === 'boolean'
    && (type === types.boolean || type[valueSym] === actual)
    ? undefined
    : { path, expected: toViolation(type), actual }
}

function satisfyType(
  path: Array<string | number>,
  baseType: types.Number | types.String, // | types.BigInt,
  type: types.ValueType<any, any>,
  actual: unknown
) {
  return typeof actual === baseType[typeSym]
    && (type === baseType || actual === type[valueSym])
    ? undefined
    : { path, expected: toViolation(type), actual }
}

function satisfyUnion<T extends types.Union>(path: Array<string | number>, type: T, actual: unknown) {
  // console.debug(`satisfyUnion`, type, actual)
  return type[valueSym].some(t => satisfyRecur(path, t, actual) === undefined)
    ? undefined
    : { path, expected: toViolation(type), actual }
}

function satisfyArray<T extends types.Array>(path: Array<string | number>, type: T, actual: unknown) {
  return Array.isArray(actual)
    && (type[valueSym] === undefined || actual.every((s, i) => satisfyRecur([...path, i], type[valueSym], s) === undefined))
    ? undefined
    : { path, expected: toViolation(type), actual }
}

function satisfyObject<T extends types.Object>(path: Array<string | number>, type: T, actual: unknown) {
  return typeof actual === 'object' && actual !== null // technically wrong, null IS object
    && !Array.isArray(actual)
    && (type === types.object as types.Object
      || Object.keys(type[valueSym]).every(p => satisfyRecur([...path, p], type[valueSym][p], (actual as any)[p]) === undefined))
    ? undefined
    : { path, expected: toViolation(type), actual }
}

function satisfyTuple<T extends types.Tuple>(path: Array<string | number>, type: T, actual: unknown) {
  return Array.isArray(actual) && actual.length === type[valueSym].length
    && actual.every((s, i) => satisfyRecur([...path, i], type[valueSym][i], s) === undefined)
    ? undefined
    : { path, expected: toViolation(type), actual }
}

function satisfyRecord(path: Array<string | number>, type: types.Record, actual: any) {
  return typeof actual === 'object' && actual !== null // technically wrong, null IS object
    && Object.keys(actual).every(k => satisfyRecur([...path, k], type[valueSym], actual[k]) === undefined)
    ? undefined
    : { path, expected: toViolation(type), actual }
}
