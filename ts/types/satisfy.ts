import { AllType } from './AllType'
import { analyze } from './analyze'
import { Generate } from './Generate'
import { getPlainAnalysisReport } from './getPlainAnalysisReport'

/**
 * Checks if the specified `subject` satisfies the `type`.
 * `satisfy()` is the shortcut of `check({ strict: false }, ...)`.
 * @return type guard (boolean). If the subject does not satisfies the type,
 * the detail report is available in `satisfy.result`,
 * and you can get a string report using `satisfy.getReport()`
 */
export function satisfy<T extends AllType>(type: T, subject: unknown): subject is Generate<T> {
  const result = satisfy.result = analyze({ strict: false }, type, subject)
  return !result.analysis.fail
}

/**
 * Analysis report.
 */
satisfy.result = { analysis: {} } as analyze.Result

/**
 * Gets a simple report of the analysis.
 */
satisfy.getReport = () => getPlainAnalysisReport(satisfy.result)

