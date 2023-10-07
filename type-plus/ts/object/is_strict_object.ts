import type { IdentityEqual } from '../equal/identity_equal.js'
import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { IsNever } from '../never/is_never.js'
import type { SelectWithDistribute } from '../type_plus/branch/select_with_distribute.js'
import type { $Else, $ResolveSelection, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is strictly the `object` type.
 */
export type IsStrictObject<T, $O extends IsStrictObject.$Options = {}> =
	IsAnyOrNever<T, $SelectionBranch> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Else>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], SelectWithDistribute.$Default['distributive']]> extends true
		? IsStrictObject._D<T, $O>
		: SelectWithDistribute._N<T, object, $O>)
	: never : never

export namespace IsStrictObject {
	export type $Options = SelectWithDistribute.$Options
	export type $Default = SelectWithDistribute.$Default
	export type $Branch = SelectWithDistribute.$Branch
	export type _D<T, $O extends IsStrictObject.$Options> =
		T extends object
		? IdentityEqual<T, {},
			$ResolveSelection<$O, T, $Else>,
			IsNever<keyof T, {
				$then: $ResolveSelection<$O, T, $Then>,
				$else: $ResolveSelection<$O, T, $Else>
			}>>
		: $ResolveSelection<$O, T, $Else>
}
