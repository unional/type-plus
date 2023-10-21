import type { $Any } from '../any/any.js'
import type { $Never } from '../never/never.js'
import type { $Unknown } from '../unknown/unknown.js'
import type { $BranchOptions } from './branch/$branch.js'
import type { $InputOptions } from './branch/$input_options.js'
import type { $ResolveBranch } from './branch/$resolve_branch.js'
import type { $Else } from './branch/selection.js'

/**
 * 🧰 *type util*
 *
 * A type utility to handle special types: `never`, `unknown`, `any`.
 */
export type $SpecialType<T, $O extends $SpecialType.$Options> =
	0 extends 1 & T ? $ResolveBranch<T, $O, [$Any]> :
	[T, unknown] extends [unknown, T] ? $ResolveBranch<T, $O, [$Unknown]> :
	[T, never] extends [never, T] ? $ResolveBranch<T, $O, [$Never]> :
	$ResolveBranch<T, $O, [$Else]>

export namespace $SpecialType {
	export type $Options = Required<$InputOptions<$Any | $Unknown | $Never | $Else>>
	export type $Branch = $BranchOptions<$Any | $Unknown | $Never | $Else>
}
