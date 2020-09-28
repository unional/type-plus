import { A } from 'ts-toolbelt'
import { reduceWhile } from '../array'
import { reduceByKey } from '../object-key'
import { typeSym, valueSym } from '../utils'
import { AllType } from './AllTypes'
import { Array as ArrayType } from './Array'
import { Boolean } from './Boolean'
import { number, Number } from './Number'
import { object, ObjectType } from './Object'
import { Record as RecordType } from './Record'
import { string, String } from './String'
import { Tuple } from './Tuple'
import { ValueType } from './types'
import { Union } from './Union'
import { toExpectation } from './Violation'

export namespace analyze {
  export type Result = {
    pass: boolean,
    analysis?: Analysis
  }
  export type Options = { strict: boolean }
  export type Analysis = {
    type: string,
    value?: number | string | boolean
    // | bigint
    | Analysis | Analysis[] | Record<string, Analysis>
    pass: boolean
    actual?: any
  }
}

export function analyze<T extends AllType>(options: analyze.Options, type: T, actual: unknown): analyze.Result {
  switch (type[typeSym]) {
    case 'unknown':
    case 'any':
      return pass(type)
    case 'undefined':
    case 'symbol':
      return typeof actual === type[typeSym] ?
        pass(type) :
        fail(type, actual)
    case 'null':
      return actual === null ?
        pass(type) :
        fail(type, actual)
    case 'boolean': return analyzeBoolean(type as Boolean, actual)
    case 'number': return analyzeType(number, type as Number, actual)
    case 'string': return analyzeType(string, type as String, actual)
    // case 'bigint': return analyzeType(bigint, type as BigInt, actual)
    case 'object': return analyzeObject(options, type as ObjectType, actual)
    // case 'record': return analyzeRecord(type as Record, actual)
    // case 'array': return analyzeArray(type as ArrayType, actual)
    // case 'tuple': return analyzeTuple(type as Tuple, actual)
    case 'union': return analyzeUnion(options, type as Union, actual)
  }
  return { pass: false, analysis: { type: 'unknown', pass: false } }
}

function analyzeBoolean(type: Boolean, actual: unknown): analyze.Result {
  const value = type[valueSym]
  if (value === undefined) {
    return typeof actual === 'boolean' ?
      pass(type) :
      fail(type, actual)
  }
  else {
    return value === actual ?
      pass(type) :
      fail(type, actual)
  }
}

function analyzeType(
  baseType: Number | String, // | BigInt,
  type: ValueType<any, any>,
  actual: unknown
) {
  return typeof actual === baseType[typeSym]
    && (type === baseType || actual === type[valueSym])
    ? pass(type)
    : fail(type, actual)
}

function analyzeObject<T extends ObjectType>(options: analyze.Options, type: T, actual: any) {
  if (!isOnlyObject(actual)) return fail(type, actual)

  if (type === object as ObjectType) return pass(type)

  const value: Record<string, any> = type[valueSym]
  const results = Object.keys(value).map(k => {
    const r = analyze(options, value[k], actual[k])
    return r.pass ? undefined : { [k]: r.analysis }
  })

  if (results.every(r => !r)) {
    return pass(type)
  } else {
    return fail({ [typeSym]: 'object', [valueSym]: results }, actual)
  }
}

function analyzeUnion<T extends Union>(options: analyze.Options, type: T, actual: unknown): analyze.Result {
  const results = type[valueSym].map(t => analyze(options, t, actual))
  const value = results.map(r => r.analysis)
  return results.some(r => r.pass) ?
    pass({ [typeSym]: 'union', [valueSym]: value }) :
    fail({ [typeSym]: 'union', [valueSym]: value }, actual)
}

function pass(t: { [typeSym]: string, [valueSym]?: any }) {
  const type = t[typeSym]
  const value = t[valueSym]
  const pass = true
  return {
    pass,
    analysis: value === undefined ? { type, pass } : { type, value, pass }
  }
}

function fail(t: { [typeSym]: string, [valueSym]?: any }, actual: any) {
  const type = t[typeSym]
  const value = t[valueSym]
  const pass = false
  return {
    pass,
    analysis: value === undefined ? { type, pass, actual } : { type, value, pass, actual }
  }
}

function isOnlyObject(actual: unknown): actual is Object {
  return typeof actual === 'object' && actual !== null && !Array.isArray(actual)
}
