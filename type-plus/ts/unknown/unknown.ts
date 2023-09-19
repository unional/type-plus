import type { $Type } from '../type_plus/type.js'

/**
 * 🧰 *type util*
 *
 * A special branch for `unknown` check to represent the value is `unknown`.
 */
export type $Unknown = $Type<'branch', 'unknown'>
