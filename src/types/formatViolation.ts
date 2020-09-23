import { tersify } from 'tersify'
import { Violation } from './Violation'

function formatViolation(v: Violation) {
  return `${v.path} expects to be '${v.expected}' but is actually '${tersify(v.actual)}'`
}

export function formatViolations(violations: Violation[]) {
  return violations.map(formatViolation)
}
