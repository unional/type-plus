import { AllType } from './AllType'
import { analyze } from './analyze'
import { Generate } from './Generate'
import { getPlainAnalysisReport } from './getPlainAnalysisReport'

/**
 * Checks if the specified `subject` satisfies the `type`.
 * @return type guard (boolean). If the subject does not satisfies the type,
 * the details violations is collected in the `satisfy.violations` array.
 */
export function satisfy<T extends AllType>(type: T, subject: unknown): subject is Generate<T> {
  const result = satisfy.result = analyze({ strict: false, debug: false }, type, subject)
  return !result.analysis.fail
}

/**
 * Violations of the `subject`.
 */
satisfy.result = { analysis: {} } as analyze.Result
satisfy.getReport = () => getPlainAnalysisReport(satisfy.result)

