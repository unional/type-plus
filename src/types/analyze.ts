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
import { formatViolation, Violation } from './Violation'

export namespace analyze {
  export type Options = { strict: boolean }
  export type Analysis = {
    type: string,
    value?: Analysis.Value,
    fail?: boolean,
    keys?: Array<number | string>,
    actual?: any
  }

  export namespace Analysis {
    export type Value = number | string | boolean
      // | bigint
      | Analysis | Analysis[] | Record<string, Analysis>
  }
}
export function analyze(options: analyze.Options, type: AllType, actual: unknown): analyze.Analysis {
  const t = type[typeSym]
  switch (t) {
    case 'unknown':
    case 'any':
      return ok(type)
    case 'undefined':
    case 'symbol':
      return typeof actual === t ? ok(type) : fail(t, undefined, actual)
    case 'null':
      return actual === null ? ok(type) : fail(t, undefined, actual)
    case 'boolean': return analyzeBoolean(type as Boolean, actual)
    case 'number': return analyzeType(number, type as Number, actual)
    case 'string': return analyzeType(string, type as String, actual)
    // case 'bigint': return analyzeType(bigint, type as BigInt, actual)
    case 'object': return analyzeObject(options, type as ObjectType, actual)
    case 'record': return analyzeRecord(options, type as RecordType, actual)
    case 'array': return analyzeArray(options, type as ArrayType, actual)
    case 'tuple': return analyzeTuple(options, type as Tuple, actual)
    case 'union': return analyzeUnion(options, type as Union, actual)
  }
}

function analyzeBoolean(type: Boolean, actual: unknown) {
  const value = type[valueSym]
  if (value === undefined) {
    return typeof actual === 'boolean' ? ok(type) : fail('boolean', value, actual)
  }
  else {
    return value === actual ? ok(type) : fail('boolean', value, actual)
  }
}

function analyzeType(
  baseType: Number | String, // | BigInt,
  type: ValueType<any, any>,
  actual: unknown
) {
  const value = type[valueSym]
  return typeof actual === baseType[typeSym] && (type === baseType || actual === value)
    ? ok(type)
    : fail(type[typeSym], type[valueSym], actual)
}

function analyzeUnion(options: analyze.Options, type: Union, actual: unknown) {
  const subTypes = type[valueSym]
  const r = subTypes.map(t => analyze(options, t, actual))
  return r.some(r => !r.fail) ? ok(type) : fail('union', subTypes.map(ok), actual)
}

function analyzeArray(options: analyze.Options, type: ArrayType<AllType>, actual: unknown) {
  const subType = type[valueSym]
  if (!Array.isArray(actual)) return fail('array', subType ? ok(subType) : undefined, actual)
  if (subType === undefined) return ok(type)

  const r = actual.reduce((p, a, i) => {
    const r = analyze(options, subType, a)
    if (r.fail) {
      p.value = r.value
      p.keys.push(i)
      p.actual.push(a)
    }
    return p
  }, { keys: [], actual: [] })
  return r.keys.length === 0 ?
    ok(type) :
    fail('array', { ...fail(subType[typeSym], r.value, r.actual), keys: r.keys }, actual)
}

function analyzeTuple(options: analyze.Options, type: Tuple, actual: unknown) {
  const value = type[valueSym]
  if (!Array.isArray(actual)) return fail('tuple', value.map(ok), actual)
  const results = value.map((v, i) => analyze(options, v, actual[i]))
  if (options.strict && results.length < actual.length) {
    results.push(fail('never', undefined, actual.slice(results.length), range(results.length, actual.length)))
    return fail('tuple', results, actual)
  }
  return results.every(r => !r.fail) ? ok(type) : fail('tuple', results, actual)
}

function analyzeObject(options: analyze.Options, type: ObjectType, actual: any) {
  const typeMap = type[valueSym]
  if (!isOnlyObject(actual)) return fail('object', typeMap ? object.map(v => ok(v), typeMap) : undefined, actual)
  if (type === object as ObjectType) return ok(type)

  const typeKeys = Object.keys(typeMap)
  const s = { ...actual }
  const results = typeKeys.reduce(
    (p, k) => {
      const r = p.value[k] = analyze(options, typeMap[k], actual[k])
      p.fail ||= !!r.fail
      s[k] = undefined
      return p
    },
    { fail: false, value: {} } as { fail: boolean, value: Record<string, analyze.Analysis> }
  )
  const skeys = Object.keys(s)
  if (options.strict && skeys.length > typeKeys.length) {
    skeys.forEach(k => {
      if (s[k] !== undefined) results.value[k] = { type: 'never', fail: true, actual: s[k] }
    })
    results.fail = true
  }

  return !results.fail ? ok(type) : fail('object', results.value, actual)
}

function analyzeRecord(options: analyze.Options, type: RecordType, actual: unknown) {
  const subType = type[valueSym]
  if (!isOnlyObject(actual)) return fail('record', ok(subType), actual)

  const r = reduceByKey(actual, (p, k) => {
    const r = analyze(options, subType, actual[k])
    if (r.fail) {
      p.value = r.value
      p.keys.push(k)
      p.actual.push(actual[k])
    }
    return p
  }, { keys: [] as string[], actual: [] as any[], value: undefined as any })
  return r.keys.length === 0 ?
    ok(type) :
    fail('record', { ...fail(subType[typeSym], r.value, r.actual), keys: r.keys }, actual)
}

function ok(t: { [typeSym]: string, [valueSym]?: any }): analyze.Analysis {
  const type = t[typeSym]
  const value = t[valueSym]
  if (value === undefined) return { type }
  if (typeof value !== 'object' || value === null) return { type, value }
  if (Array.isArray(value)) return { type, value: value.map(ok) }
  if (value[typeSym]) return { type, value: ok(value) }
  return {
    type, value: reduceByKey(
      value as Record<string, any>,
      (p, k) => (p[k] = ok(value[k]), p),
      {} as Record<string, any>)
  }
}

function fail(type: string, value: analyze.Analysis.Value | undefined, actual: any, keys?: Array<number | string>) {
  return value === undefined ?
    keys ? { type, fail: true, keys, actual } : { type, fail: true, actual } :
    keys ? { type, value, fail: true, keys, actual } : { type, value, fail: true, actual }
}

function isOnlyObject(actual: unknown): actual is Object {
  return typeof actual === 'object' && actual !== null && !Array.isArray(actual)
}

function range(start: number, end: number) {
  const r: number[] = []
  while (start < end) r.push(start++)
  return r
}

export function getPlainAnalysisReport(analysis: analyze.Analysis) {
  const violations = toViolations([], analysis)
  return violations.map(formatViolation).join('\n')
}

function toViolations(path: Array<string | number>, analysis: analyze.Analysis): Violation[] {
  if (!analysis.fail) return []
  if (analysis.keys) return [] // TODO
  return [{
    path,
    expected: { type: analysis.type, value: analysis.value },
    actual: analysis.actual
  }]
}
