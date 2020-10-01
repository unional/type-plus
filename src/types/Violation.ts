import { tersify } from 'tersify'
import { reduceByKey } from '../object-key'
import { typeSym, valueSym } from '../utils'
import { AllType } from './AllTypes'

export type Violation = {
  path: Array<string | number>,
  expected: Violation.Expectation,
  actual: any
}

export namespace Violation {
  export type Expectation = {
    type: string,
    value?: number | string | boolean
    // | bigint
    | Expectation | Expectation[] | Record<string, Expectation>
  }
}

export function toExpectation(type: AllType): Violation.Expectation {
  const value = (type as any)[valueSym]
  if (value === undefined) return { type: type[typeSym] }
  if (Array.isArray(value)) return { type: type[typeSym], value: value.map(toExpectation) }
  if (typeof value !== 'object') return { type: type[typeSym], value }
  if (value[typeSym]) return { type: type[typeSym], value: toExpectation(value) }
  return {
    type: type[typeSym], value: reduceByKey(value as Record<string, any>, (p, k) => {
      p[k] = toExpectation(value[k])
      return p
    }, {} as Record<string, any>)
  }
}

export function getPlainViolationsReport(violations: Violation[]) {
  return violations.map(formatViolation).join('\n')
}

export function formatViolation(v: Violation) {
  const path = formatPath(v.path)
  const expected = formatExpectation(v.expected)
  return `${path} expects to be ${expected} but is actually ${tersify(v.actual)}`
}

function formatPath(path: Array<string | number>) {
  if (path.length === 0) return 'subject'
  return ''
}

function formatExpectation(e: Violation.Expectation): string {
  switch (e.type) {
    case 'undefined':
    case 'null':
    case 'symbol':
      return e.type
    case 'boolean':
    case 'number':
    case 'bigint':
      return e.value === undefined ? e.type : String(e.value)
    case 'string':
      return e.value === undefined ? e.type : `'${e.value}'`
    case 'array':
      return e.value === undefined ? 'Array<any>' : `Array<${formatExpectation(e.value as any)}>`
    case 'tuple':
      return `[${formatExpectations(e.value as Violation.Expectation[])}]`
    case 'object':
      return e.value === undefined ? e.type
        : `{ ${reduceByKey(
          e.value as Record<string, any>,
          (p, k) => {
            p.push(`${k}: ${formatExpectation((e.value as any)[k] as any)}`)
            return p
          },
          [] as string[]
        ).join(',')} }`
    case 'record':
      return `Record<string, ${formatExpectation(e.value as any)}>`
    case 'union':
      return `(${formatExpectations(e.value as Violation.Expectation[], ' | ')})`
    // istanbul ignore next
    default:
      return `report not expected: ${e.value}`
  }
}

function formatExpectations(es: Violation.Expectation[], sep = ',') {
  return es.map(formatExpectation).join(sep)
}
