import type { IdentityEqual } from '../equal/identity_equal.js'
import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { IsNever } from '../never/is_never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Select } from '../type_plus/branch/$select.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/$selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is strictly the `object` type.
 */
export type IsStrictObject<T, $O extends IsStrictObject.$Options = {}> =
	IsAnyOrNever<T, $SelectionBranch> extends infer R
	? R extends $Then ? $ResolveBranch<T, $O, [$Else]>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], $Select.$Default['distributive']]> extends true
		? IsStrictObject._D<T, $O>
		: $Select._N<T, object, $O>)
	: never : never

export namespace IsStrictObject {
	export type $Options = $Select.$Options
	export type $Default = $Select.$Default
	export type $Branch = $Select.$Branch
	export type _D<T, $O extends IsStrictObject.$Options> =
		T extends object
		? IdentityEqual<T, {},
			$ResolveBranch<T, $O, [$Else]>,
			IsNever<keyof T, {
				$then: $ResolveBranch<T, $O, [$Then]>,
				$else: $ResolveBranch<T, $O, [$Else]>
			}>>
		: $ResolveBranch<T, $O, [$Else]>
}
