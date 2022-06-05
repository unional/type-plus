import type { AllType } from './AllType.js'
import { analyze } from './analyze.js'
import type { Generate } from './Generate.js'
import { getPlainAnalysisReport } from './getPlainAnalysisReport.js'

/**
 * Checks if the specified `subject` conforms to the `type`.
 * `conform()` is the shortcut of `check({ strict: true }, ...)`.
 * @return type guard (boolean). If the subject does not conform to the type,
 * the detail report is available in `conform.result`,
 * and you can get a string report using `conform.getReport()`
 */
export function conform<T extends AllType>(type: T, subject: unknown): subject is Generate<T> {
  const result = conform.result = analyze({ strict: true }, type, subject)
  return !result.analysis.fail
}

/**
 * Analysis report.
 */
conform.result = { analysis: {}, actual: undefined } as analyze.Result

/**
 * Gets a simple report of the analysis.
 */
conform.getReport = () => getPlainAnalysisReport(conform.result)

