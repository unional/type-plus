import { typeSym, valueSym } from '../utils'
import { AllType } from './AllTypes'
import { Array as ArrayType } from './Array'
// import { BigInt } from './BigInt'
import { boolean, Boolean } from './Boolean'
import { Generate } from './Generate'
import { number, Number } from './Number'
import { object, ObjectType } from './Object'
import { Record } from './Record'
import { string, String } from './String'
import { Tuple } from './Tuple'
import { ValueType } from './types'
import { Union } from './Union'
import { getPlainViolationsReport, toViolation, Violation } from './Violation'

/**
 * Checks if the specified `subject` satisfies the `type`.
 * @return type guard (boolean). If the subject does not satisfies the type,
 * the details violations is collected in the `satisfy.violations` array.
 */
export function satisfy<T extends AllType>(type: T, subject: unknown): subject is Generate<T> {
  const violation = satisfyRecur([], type, subject)
  satisfy.violations = violation ? [violation] : []
  return !violation
}
function satisfyRecur<T extends AllType>(path: Array<string | number>, type: T, subject: unknown): Violation | undefined {
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
    case 'boolean': return satisfyBoolean(path, type as Boolean, subject)
    case 'number': return satisfyType(path, number, type as Number, subject)
    case 'string': return satisfyType(path, string, type as String, subject)
    // case 'bigint': return satisfyType(path, bigint, type as BigInt, subject)
    case 'union': return satisfyUnion(path, type as Union, subject)
    case 'object': return satisfyObject(path, type as ObjectType, subject)
    case 'record': return satisfyRecord(path, type as Record, subject)
    case 'array': return satisfyArray(path, type as ArrayType, subject)
    case 'tuple': return satisfyTuple(path, type as Tuple, subject)
  }
}

/**
 * Violations of the `subject`.
 */
satisfy.violations = [] as Violation[]
satisfy.getReport = () => getPlainViolationsReport(satisfy.violations)

function satisfyBoolean(path: Array<string | number>, type: Boolean, actual: unknown) {
  return typeof actual === 'boolean'
    && (type === boolean || type[valueSym] === actual)
    ? undefined
    : { path, expected: toViolation(type), actual }
}

function satisfyType(
  path: Array<string | number>,
  baseType: Number | String, // | BigInt,
  type: ValueType<any, any>,
  actual: unknown
) {
  return typeof actual === baseType[typeSym]
    && (type === baseType || actual === type[valueSym])
    ? undefined
    : { path, expected: toViolation(type), actual }
}

function satisfyUnion<T extends Union>(path: Array<string | number>, type: T, actual: unknown) {
  // console.debug(`satisfyUnion`, type, actual)
  return type[valueSym].some(t => satisfyRecur(path, t, actual) === undefined)
    ? undefined
    : { path, expected: toViolation(type), actual }
}

function satisfyArray<T extends ArrayType>(path: Array<string | number>, type: T, actual: unknown) {
  return Array.isArray(actual)
    && (type[valueSym] === undefined || actual.every((s, i) => satisfyRecur([...path, i], type[valueSym], s) === undefined))
    ? undefined
    : { path, expected: toViolation(type), actual }
}

function satisfyObject<T extends ObjectType>(path: Array<string | number>, type: T, actual: unknown) {
  return typeof actual === 'object' && actual !== null // technically wrong, null IS object
    && !Array.isArray(actual)
    && (type === object as ObjectType
      || Object.keys(type[valueSym]).every(p => satisfyRecur([...path, p], type[valueSym][p], (actual as any)[p]) === undefined))
    ? undefined
    : { path, expected: toViolation(type), actual }
}

function satisfyTuple<T extends Tuple>(path: Array<string | number>, type: T, actual: unknown) {
  return Array.isArray(actual) && actual.length === type[valueSym].length
    && actual.every((s, i) => satisfyRecur([...path, i], type[valueSym][i], s) === undefined)
    ? undefined
    : { path, expected: toViolation(type), actual }
}

function satisfyRecord(path: Array<string | number>, type: Record, actual: any) {
  return typeof actual === 'object' && actual !== null // technically wrong, null IS object
    && Object.keys(actual).every(k => satisfyRecur([...path, k], type[valueSym], actual[k]) === undefined)
    ? undefined
    : { path, expected: toViolation(type), actual }
}
