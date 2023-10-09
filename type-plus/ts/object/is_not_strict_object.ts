import type { IdentityEqual } from '../equal/identity_equal.js'
import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { IsNever } from '../never/is_never.js'
import type { $ResolveOptions } from '../type_plus/$resolve_options.js'
import type { $ResolveSelection } from '../type_plus/branch/$resolve_selection.js'
import type { SelectInvertWithDistribute } from '../type_plus/branch/select_invert_with_distribute.js'
import type { $Else, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is strictly the `object` type.
 */
export type IsNotStrictObject<T, $O extends IsNotStrictObject.$Options = {}> =
	IsAnyOrNever<T, $SelectionBranch> extends infer R
	? R extends $Then ? $ResolveSelection<$O, T, $Then>
	: R extends $Else ? ($ResolveOptions<[$O['distributive'], SelectInvertWithDistribute.$Default['distributive']]> extends true
		? IsNotStrictObject._D<T, $O>
		: SelectInvertWithDistribute._N<T, object, $O>)
	: never : never

export namespace IsNotStrictObject {
	export type $Options = SelectInvertWithDistribute.$Options
	export type $Default = SelectInvertWithDistribute.$Default
	export type $Branch = SelectInvertWithDistribute.$Branch
	export type _D<T, $O extends IsNotStrictObject.$Options> =
		T extends object
		? IdentityEqual<T, {},
			$ResolveSelection<$O, T, $Then>,
			IsNever<keyof T, {
				$then: $ResolveSelection<$O, T, $Else>,
				$else: $ResolveSelection<$O, T, $Then>
			}>>
		: $ResolveSelection<$O, T, $Then>
}
