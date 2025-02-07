import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { IsAny } from '../any/is_any.js'
import type { And, Or } from '../logical/logical.js'
import type { IsNever } from '../never/is_never.js'
import type { IsObject } from '../object/is_object.js'
import type { Properties } from '../object/properties.js'
import type { Assignable } from '../predicates/assignable.js'
import type { IsEqual } from './is_equal.js'

/**
 * 🎭 *predicate*
 *
 * Validate `A` and `B` are "equal".
 *
 * Note that intersection type checks only works at first level.
 * It cannot be check recursively,
 * or else will run into infinite recursion if the type includes recursive types.
 *
 * @example
 * ```ts
 * type R = Equal<undefined, undefined> // true
 *
 * type R = Equal<never, undefined> // false
 * type R = Equal<unknown, undefined> // false
 * type R = Equal<string | boolean, undefined> // false
 *
 * type R = Equal<string | undefined, undefined> // boolean
 * ```
 *
 * 🔱 **branching**
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = Equal<undefined, undefined, Equal.$Branch> // $Then
 * type R = Equal<string, undefined, Equal.$Branch> // $Else
 * ```
 */
export type Equal<A, B, $O extends Equal.$Options = {}> = [A, B] extends [B, A]
	? BothNever<
			A,
			B,
			$ResolveBranch<never, $O, [$Then]>,
			$ResolveBranch<never, $O, [$Else]>,
			BothAny<
				A,
				B,
				$ResolveBranch<never, $O, [$Then]>,
				$ResolveBranch<never, $O, [$Else]>,
				Equal.$Same<
					A,
					B,
					{
						$then: $ResolveBranch<never, $O, [$Then]>
						$else: [IsObject<A>, IsObject<B>] extends [true, true]
							? Equal.$Same<
									Properties<A>,
									Properties<B>,
									{
										$then: [A, B] extends [(...args: infer P1) => any, (...args: infer P2) => any]
											? IsEqual<P1, P2, $ResolveBranch<never, $O, [$Then]>, $ResolveBranch<never, $O, [$Else]>>
											: $ResolveBranch<never, $O, [$Then]>
										$else: $ResolveBranch<never, $O, [$Else]>
									}
								>
							: // `A` and `B` are narrowed, need to check again.
								// This is fixed in TS 5.0.2, but keeping it to support older versions.
								[A, B] extends [B, A]
								? $ResolveBranch<never, $O, [$Then]>
								: $ResolveBranch<never, $O, [$Else]>
					}
				>
			>
		>
	: $ResolveBranch<A, $O, [$Else]>

type BothNever<A, B, Both, One, None> = And<IsNever<A>, IsNever<B>, Both, Or<IsNever<A>, IsNever<B>, One, None>>

type BothAny<A, B, Both, One, None> = And<IsAny<A>, IsAny<B>, Both, Or<IsAny<A>, IsAny<B>, One, None>>

// export type Equal<A, B, $O extends Equal.$Options = {}> = [
// 	$Special<A, $Special.Branch>,
// 	$Special<B, $Special.Branch>,
// ] extends [infer $A, infer $B]
// 	? [$A, $B] extends [$B, $A]
// 		? $A extends $Else
// 			? // Both `$A` and `$B` are non-special types.
// 			[IsObject.$<A, IsObject.$Branch>, IsObject.$<B, IsObject.$Branch>] extends [$Then, $Then]
// 			? Equal.$Same<
// 			Properties<A>,
// 			Properties<B>,
// 			{
// 				$then: [A, B] extends [(...args: infer P1) => any, (...args: infer P2) => any]
// 				? Equal<P1, P2, $O>
// 				: $ResolveBranch<A, $O, [$Then]>,
// 				$else: $ResolveBranch<A, $O, [$Else]>
// 			}>: [A, B] extends [B, A] ?
// 			$ResolveBranch<A, $O, [$Then]>:
// 			$ResolveBranch<A, $O, [$Else]>
// 				// Equal.$Same<
// 				// 	Equal.$ToProps<A>,
// 				// 	Equal.$ToProps<B>,
// 				// 	{
// 				// 		$then: $ResolveBranch<A, $O, [$Then]>
// 				// 		$else: $ResolveBranch<A, $O, [$Else]>
// 				// 	}
// 				// >
// 			: $ResolveBranch<A, $O, [$Then]>
// 		: $ResolveBranch<A, $O, [$Else]>
// 	: $InferError<'Unable to infer type of $A or $B'>

export namespace Equal {
	export type $Options = $Selection.$BaseOptions
	export type $Default = $Selection.Predicate
	export type $Branch = $Selection.Branch

	export type _ExactEqualDistributive<T, U, $O extends $Options> = T extends U
		? U extends T
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Else]>
	export type _ExactEqualNonDistributive<T, U, $O extends $Options> = [T, U] extends [U, T]
		? $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>

	/**
	 * 🎭 *predicate*
	 *
	 * Validate `A` and `B` are identically equal.
	 */
	export type $Same<A, B, $O extends $Options> = (<_>() => _ extends (A & _) | _ ? 1 : 2) extends <_>() => _ extends
		| (B & _)
		| _
		? 1
		: 2
		? $O['$then']
		: $O['$else']

	export type $ToProps<T> = Assignable.$<
		object,
		T,
		{
			$then: T & Properties<T>
			$else: T & Properties<T>
		}
	>

	// export type $ToProps<T> = T extends (...args: infer A) => infer R
	// 	? T extends ((...args: A) => R) & infer U
	// 		? [unknown] extends [U]
	// 			? T
	// 			: Properties<U>
	// 		: 1
	// 	: T extends Function & infer U
	// 		? [unknown] extends [U]
	// 			? T
	// 			: Properties<U>
	// 		: T extends any[]
	// 			? [T] extends [T[0][] & infer U]
	// 				? [unknown] extends [U]
	// 					? T
	// 					: T[0][] & Properties<U>
	// 				: $InferError<'Cannot infer extra properties from Array'>
	// 			: Properties<T>
}

/**
 * 🎭 *predicate*
 * ㊙️ *internal*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = $SelectInvert<undefined, undefined> // true
 *
 * type R = $SelectInvert<never, undefined> // false
 * type R = $SelectInvert<unknown, undefined> // false
 * type R = $SelectInvert<string | boolean, undefined> // false
 *
 * type R = $SelectInvert<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = $SelectInvert<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = $SelectInvert<never, undefined, { selection: 'filter' }> // never
 * type R = $SelectInvert<unknown, undefined, { selection: 'filter' }> // never
 * type R = $SelectInvert<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = $SelectInvert<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = $SelectInvert<undefined | 1, undefined> // boolean
 * type R = $SelectInvert<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = $SelectInvert<undefined, undefined, $SelectionBranch> // $Then
 * type R = $SelectInvert<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type $SelectInvert<T, U, $O extends $SelectInvert.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<T, $O, [$Any, $Then]>
		$never: $ResolveBranch<T, $O, [$Never, $Then]>
		$unknown: $ResolveBranch<T, $O, [$Unknown, $Then]>
		$void: $ResolveBranch<T, $O, [$Void, $Then]>
		$else: $Distributive.Parse<$O> extends true ? $SelectInvert._D<T, U, $O> : $SelectInvert._N<T, U, $O>
	}
>

export namespace $SelectInvert {
	export type $Options = $Selection.Options & $Distributive.Options & $InputOptions<$Any | $Unknown | $Never>
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch = $Selection.Branch & $Distributive.Default
	export type _D<T, U, $O extends $SelectInvert.$Options> = T extends U
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
	export type _N<T, U, $O extends $SelectInvert.$Options> = [T] extends [U]
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
}

/**
 * 🎭 *predicate*
 * ㊙️ *internal*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = $SelectInvertStrict<undefined, undefined> // true
 *
 * type R = $SelectInvertStrict<never, undefined> // false
 * type R = $SelectInvertStrict<unknown, undefined> // false
 * type R = $SelectInvertStrict<string | boolean, undefined> // false
 *
 * type R = $SelectInvertStrict<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = $SelectInvertStrict<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = $SelectInvertStrict<never, undefined, { selection: 'filter' }> // never
 * type R = $SelectInvertStrict<unknown, undefined, { selection: 'filter' }> // never
 * type R = $SelectInvertStrict<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = $SelectInvertStrict<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = $SelectInvertStrict<undefined | 1, undefined> // boolean
 * type R = $SelectInvertStrict<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = $SelectInvertStrict<undefined, undefined, $SelectionBranch> // $Then
 * type R = $SelectInvertStrict<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type $SelectInvertStrict<T, U, $O extends $SelectInvertStrict.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<T, $O, [$Any, $Then]>
		$unknown: $ResolveBranch<T, $O, [$Unknown, $Then]>
		$never: $ResolveBranch<T, $O, [$Never, $Then]>
		$else: $Distributive.Parse<$O> extends true ? $SelectInvertStrict._D<T, U, $O> : $SelectInvertStrict._N<T, U, $O>
	}
>

export namespace $SelectInvertStrict {
	export type $Options = $Selection.Options & $Distributive.Options & $InputOptions<$Any | $Unknown | $Never>
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch = $Selection.Branch & $Distributive.Default
	export type _D<T, U, $O extends $SelectInvertStrict.$Options> = T extends U
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
	export type _N<T, U, $O extends $SelectInvertStrict.$Options> = [T, U] extends [U, T]
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
}
