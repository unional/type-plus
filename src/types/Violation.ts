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
    value?: Expectation | Expectation[] | Record<string, Expectation>
  }
}

export function toViolation(type: AllType): Violation.Expectation {
  const value = (type as any)[valueSym]
  if (value === undefined) return { type: type[typeSym] }
  if (Array.isArray(value)) return { type: type[typeSym], value: value.map(toViolation) }
  if (typeof value !== 'object') return { type: type[typeSym], value }
  if (value[typeSym]) return { type: type[typeSym], value: toViolation(value) }
  return {
    type: type[typeSym], value: reduceByKey(value as Record<string, any>, (p, k) => {
      p[k] = toViolation(value[k])
      return p
    }, {} as Record<string, any>)
  }
}

export function getPlainViolationsReport(violations: Violation[]) {
  return violations.map(formatViolation).join('\n')
}

function formatViolation(v: Violation) {
  const path = formatPath(v.path)
  const expected = formatExpectation(v.expected)
  return `${path} expects to be ${expected} but is actually '${tersify(v.actual)}'`
}

function formatPath(path: Array<string | number>) {
  if (path.length === 0) return 'subject'
  return ''
}

function formatExpectation(e: Violation.Expectation) {
  if (e.type === 'undefined') return 'undefined'
  if (!e.value) {
    return ['a', 'o', 'u'].indexOf(e.type[0]) >= 0
      ? `an ${e.type}` : `a ${e.type}`
  }
  return e
}
