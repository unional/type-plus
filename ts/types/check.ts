import type { AllType } from './AllType.js'
import { analyze } from './analyze.js'
import type { Generate } from './Generate.js'
import { getPlainAnalysisReport } from './getPlainAnalysisReport.js'

/**
 * Checks if the specified `subject` against the `type`.
 * @return type guard (boolean). If the subject does not check to the type,
 * the detail report is available in `check.result`,
 * and you can get a string report using `check.getReport()`
 */
export function check<T extends AllType>(options: analyze.Options, type: T, subject: unknown): subject is Generate<T> {
  const result = check.result = analyze(options, type, subject)
  return !result.analysis.fail
}

/**
 * Analysis report.
 */
check.result = { analysis: {}, actual: undefined } as analyze.Result

/**
 * Gets a simple report of the analysis.
 */
check.getReport = () => getPlainAnalysisReport(check.result)

