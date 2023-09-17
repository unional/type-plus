import type { $SelectionPredicate, $SelectionOptions } from './selection.js'
import type { typeKey } from '../type.js'

/**
 * 🧰 *type util*
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Check is `T` a branch type.
 *
 * @typeparam Options specifies the selection options (`then`, `else`).
 * Note that it does not support merging of options like other types,
 * as this is used internally by `ResolveCase`.
 * You need to specify both `$then` and `$else`.
 */
export type $IsBranch<
	V,
	$Options extends $SelectionOptions = $SelectionPredicate
> = V extends { [typeKey]: 'branch' } ? $Options['$then'] : $Options['$else']
