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

export namespace analyze {
  export type Options = { strict: boolean }
  export type Analysis = {
    type: string,
    value?: Analysis.Value
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
export function analyze<T extends AllType>(options: analyze.Options, typeDef: T, actual: unknown): analyze.Analysis {
  return analyzeInternal(options, typeDef, actual)
}
function analyzeInternal<T extends AllType>(options: analyze.Options, type: T, actual: unknown): analyze.Analysis {
  const t = type[typeSym]
  switch (t) {
    case 'unknown':
    case 'any':
      return ok(type)
    case 'undefined':
    case 'symbol':
      return typeof actual === t ?
        ok(type) :
        fail(t, undefined, actual)
    case 'null':
      return actual === null ?
        ok(type) :
        fail(t, undefined, actual)
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
  return typeof actual === baseType[typeSym]
    && (type === baseType || actual === value)
    ? ok(type)
    : fail(type[typeSym], type[valueSym], actual)
}

function analyzeUnion<T extends Union>(options: analyze.Options, type: T, actual: unknown) {
  const subTypes = type[valueSym]
  const r = subTypes.map(t => analyzeInternal(options, t, actual))
  return r.some(r => !r.fail) ?
    ok(type) :
    fail('union', subTypes.map(ok), actual)
}

function analyzeArray<T extends ArrayType<AllType>>(options: analyze.Options, type: T, actual: unknown) {
  const subType = type[valueSym]
  if (!Array.isArray(actual)) return fail('array', subType ? ok(subType) : undefined, actual)
  if (subType === undefined) return ok(type)

  const r = actual.reduce((p, a, i) => {
    const r = analyzeInternal(options, subType, a)
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

function analyzeTuple<T extends Tuple>(options: analyze.Options, type: T, actual: unknown) {
  const value = type[valueSym]
  if (!Array.isArray(actual)) return fail('tuple', value.map(ok), actual)
  const results = value.map((v, i) => analyze(options, v, actual[i]))
  if (results.length < actual.length) {
    results.push(fail('never', undefined, actual.slice(results.length), range(results.length, actual.length)))
    return fail('tuple', results, actual)
  }
  return results.every(r => !r.fail) ?
    ok(type) :
    fail('tuple', results, actual)
}

function analyzeObject<T extends ObjectType>(options: analyze.Options, type: T, actual: any) {
  const value = type[valueSym]
  if (!isOnlyObject(actual)) return fail('object', value, actual)

  if (type === object as ObjectType) return ok(type)

  let allPass = true
  const results = Object.keys(value).reduce(
    (p, k) => {
      const r = p[k] = analyzeInternal(options, value[k], actual[k])
      allPass &&= !r.fail
      return p
    },
    {} as Record<string, analyze.Analysis>
  )
  return allPass ? ok(type) : fail('object', results, actual)
}

function analyzeRecord(options: analyze.Options, type: RecordType, actual: unknown) {
  const subType = type[valueSym]
  if (!isOnlyObject(actual)) return fail('record', ok(subType), actual)


  const r = reduceByKey(actual, (p, k) => {
    const r = analyzeInternal(options, subType, actual[k])
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
