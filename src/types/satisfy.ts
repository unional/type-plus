import { reduceWhile } from '../array'
import { typeSym, valueSym } from '../utils'
import { AllType } from './AllType'
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
import { getPlainViolationsReport, toExpectation, Violation } from './Violation'

/**
 * Checks if the specified `subject` satisfies the `type`.
 * @return type guard (boolean). If the subject does not satisfies the type,
 * the details violations is collected in the `satisfy.violations` array.
 */
export function satisfy<T extends AllType>(type: T, subject: unknown): subject is Generate<T> {
  satisfy.violations = satisfyRecur([], type, subject)
  return satisfy.violations.length === 0
}
function satisfyRecur<T extends AllType>(path: Array<string | number>, type: T, subject: unknown): Violation[] {
  switch (type[typeSym]) {
    case 'unknown':
    case 'any': return []
    case 'undefined':
    case 'symbol': {
      return typeof subject === type[typeSym]
        ? []
        : [{ path, expected: toExpectation(type), actual: subject }]
    }
    case 'null': {
      return subject === null
        ? []
        : [{ path, expected: toExpectation(type), actual: subject }]
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
    ? []
    : [{ path, expected: toExpectation(type), actual }]
}

function satisfyType(
  path: Array<string | number>,
  baseType: Number | String, // | BigInt,
  type: ValueType<any, any>,
  actual: unknown
) {
  return typeof actual === baseType[typeSym]
    && (type === baseType || actual === type[valueSym])
    ? []
    : [{ path, expected: toExpectation(type), actual }]
}

function satisfyUnion<T extends Union>(path: Array<string | number>, type: T, actual: unknown) {
  // console.debug(`satisfyUnion`, type, actual)
  return type[valueSym].some(t => satisfyRecur(path, t, actual).length === 0)
    ? []
    : [{ path, expected: toExpectation(type), actual }]
}

function satisfyArray<T extends ArrayType>(path: Array<string | number>, type: T, actual: unknown) {
  if (!Array.isArray(actual)) return [{ path, expected: toExpectation(type), actual }]
  if (type[valueSym] === undefined) return []

  return reduceWhile(
    (p) => p.length < 5,
    (p, s, i) => {
      const violations = satisfyRecur([...path, i], type[valueSym], s)
      return violations ? p.concat(violations) : p
    },
    [] as Violation[],
    actual
  )
}

function satisfyTuple<T extends Tuple>(path: Array<string | number>, type: T, actual: unknown) {
  if (!Array.isArray(actual)) return [{ path, expected: toExpectation(type), actual }]

  return reduceWhile(
    (p) => p.length < 5,
    (p, type, i) => {
      const violations = satisfyRecur([...path, i], type, actual[i])
      return violations ? p.concat(violations) : p
    },
    [] as Violation[],
    type[valueSym]
  )
}

function satisfyObject<T extends ObjectType>(path: Array<string | number>, type: T, actual: unknown) {
  if (!isOnlyObject(actual)) return [{ path, expected: toExpectation(type), actual }]

  if (type === object as ObjectType) return []

  return reduceWhile(
    (p) => p.length < 5,
    (p, key) => {
      const violations = satisfyRecur([...path, key], type[valueSym][key], (actual as any)[key])
      return violations ? p.concat(violations) : p
    },
    [] as Violation[],
    Object.keys(actual)
  )
  // .map(v => ({
  //   path: v.path,
  //   expected: { type: 'object', value: { [v.path[path.length]]: v.expected.value } },
  //   actual: v.actual
  // }))
}

function satisfyRecord(path: Array<string | number>, type: Record, actual: any) {
  if (!isOnlyObject(actual)) return [{ path, expected: toExpectation(type), actual }]

  const valueType = type[valueSym]
  return reduceWhile(
    (p) => p.length < 5,
    (p, key) => {
      const violations = satisfyRecur([...path, key], valueType, (actual as any)[key])
      return violations ? p.concat(violations) : p
    },
    [] as Violation[],
    Object.keys(actual)
  )
}

function isOnlyObject(actual: unknown): actual is Object {
  return typeof actual === 'object' && actual !== null && !Array.isArray(actual)
}
