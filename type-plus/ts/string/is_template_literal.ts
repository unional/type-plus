import type { Assignable } from '../predicates/assignable.js'
import type { $Equality } from '../type_plus/$equality.js'
import type { $MergeOptions } from '../type_plus/$merge_options.js'
import type { $SpecialType } from '../type_plus/$special_type.js'
import type { $IsDistributive } from '../type_plus/branch/$is_distributive.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $Else, $Then } from '../type_plus/branch/$selection.js'
import type { $ExtractManipulatedString } from './$extract_manipulated_string.js'

export type IsTemplateLiteral<T, $O extends IsTemplateLiteral.$Options = {}> =
	$SpecialType<T,
		$MergeOptions<$O,
			{
				$then: $ResolveBranch<T, $O, [$Else]>,
				$else: IsTemplateLiteral.$<T, $O>
			}
		>
	>

export namespace IsTemplateLiteral {
	export type $Options = $Equality.$Options
	export type $Branch<$O extends $Options = {}> = $Equality.$Branch<$O>

	export type $UtilOptions = Assignable.$UtilOptions

	export type $<T, $O extends $UtilOptions> =
		$IsDistributive<$O, { $then: _D<T, $O>, $else: _N<T, $O> }>

	type _D<T, $O extends $UtilOptions> =
		T extends string
		? ($ExtractManipulatedString<`${T}`> extends infer K
			? (string extends K
				? $ResolveBranch<T, $O, [$Else]>
				: (K extends string
					? (Uppercase<K> extends Uppercase<Lowercase<K>>
						? (Lowercase<K> extends Lowercase<Uppercase<K>>
							? $ResolveBranch<T, $O, [$Else]>
							: $ResolveBranch<T, $O, [$Then]>)
						: $ResolveBranch<T, $O, [$Then]>)
					: $ResolveBranch<T, $O, [$Else]>))
			: never)
		: $ResolveBranch<T, $O, [$Else]>

	type _N<T, $O extends $UtilOptions> =
		_D<T, { $then: $Then, $else: $Else }> extends infer R
		? $Then | $Else extends R
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [R]>
		: never
	// [T] extends [string]
	// ? ($ExtractProcessedString<`${T}`> extends infer K
	// 	? ([string] extends [K]
	// 		? $ResolveBranch<T, $O, [$Else]>
	// 		: ([K] extends [string] //? Uppercase<Lowercase<K>>
	// 			? (Uppercase<K> extends Uppercase<Lowercase<K>>
	// 				? (Lowercase<K> extends Lowercase<Uppercase<K>>
	// 					? $ResolveBranch<T, $O, [$Else]>
	// 					: $ResolveBranch<T, $O, [$Then]>
	// 					)
	// 				: $ResolveBranch<T, $O, [$Then]>
	// 				)
	// 			: $ResolveBranch<T, $O, [$Else]>
	// 		)
	// 	)
	// 	: never)
	// : $ResolveBranch<T, $O, [$Else]>
}
