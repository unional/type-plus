import { AllType } from './AllType'
import { analyze } from './analyze'
import { formatViolation, Violation } from './Violation'

export function getPlainAnalysisReport(analysisResult: analyze.Result) {
  // console.log(analysisResult.analysis)
  const violations = toViolations(analysisResult.options, [], analysisResult.analysis)
  // console.log(violations)
  return violations.map(formatViolation).join('\n')
}

function toViolations(options: analyze.Options, path: Array<string | number>, { type, value, fail }: AllType.Analysis): Violation[] {
  // console.log({ type, value, fail, keys, actual })
  const violations: Violation[] = []
  if (!fail) return violations

  violations.push({ path, expected: { type, value, }, actual: {} })
  if (Array.isArray(value)) {
    const v2 = value.reduce((p, a, i) => {
      if (a.fail) p.push(...toViolations(options, [...path, i], a))
      return p
    }, [] as Violation[])
    if (v2.length > 0) violations.push(...v2)
  }
  return violations
}
