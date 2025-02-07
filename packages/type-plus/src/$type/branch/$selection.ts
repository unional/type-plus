import type { $Branch } from './$branch.js'
import type { $SelectionOptions } from './$selection_options.js'

export type $Then = $Branch<'$then'>
export type $Else = $Branch<'$else'>

declare const $then: '$then'
declare const $else: '$else'

export namespace $Then {
	export type $Key = '$then'
	export type $Branch = {
		[$then]: $Then
	}
}

export namespace $Else {
	export type $Key = '$else'
	export type $Branch = {
		[$else]: $Else
	}
}

/**
 * 🧰 *type util*
 *
 * Invert the selection branch.
 *
 * i.e.
 * - `$Then` -> `$Else`
 * - `$Else` -> `$Then`
 */
export type $InvertSelection<Branch extends $Then | $Else> = Branch extends $Then ? $Else : $Then

/**
 * 🧰 *type util*
 *
 * Branch option for selection logic.
 * It allows finely customizing the behavior of your type.
 *
 * Using this as the default value of your `$Options` is the recommended best practice.
 *
 * This encourage consumer of your type to use conditional type to avoid performance issues.
 *
 * @example
 * ```ts
 * type YourType<
 *   T,
 *   $Options extends YourType.$Options = YourType.$Branch
 * > = ...
 *
 * namespace YourType {
 *   export type $Options = $SelectionOptions
 *   export type $Branch = $SelectionBranch
 * }
 *
 * type R = YourType<T> extends infer R
 *   ? R extends $Then ? HandleThen
 *   : R extends $Else ? HandleElse
 *   : never
 * ```
 */
export type $SelectionBranch<$O extends $SelectionOptions = {}> = {
	[$then]: $Then
	[$else]: $Else
} & $O

/**
 * 🧰 *type util*
 *
 * Default Options for filter selection logic.
 *
 * `filter` means the logic returns `T` when the condition is met,
 * and returns `never` otherwise.
 *
 * @example
 * ```ts
 * type YourType<
 *   T,
 *   Options extends YourType.$Options = YourType.$Default> = ...
 *
 * namespace YourType {
 *   export type $Options = $SelectionOptions
 *   export type $Default = $SelectionFilter
 * }
 *
 * type R = YourType<ThenType> // ThenType
 * type X = YourType<ElseType> // never
 * ```
 */
export type $SelectionFilter<T> = {
	selection: 'filter'
	[$then]: T
	[$else]: never
}

/**
 * 🧰 *type util*
 *
 * Default Options for predicate selection logic.
 *
 * `predicate` means the logic returns `true` or `false` depending on the condition.
 *
 * @example
 * ```ts
 * type YourType<
 *   T,
 *   Options extends YourType.$Options = YourType.$Default> = ...
 *
 * namespace YourType {
 *   export type $Options = $SelectionOptions
 *   export type $Default = $SelectionPredicate
 * }
 *
 * type R = YourType<ThenType> // true
 * type X = YourType<ElseType> // false
 * ```
 */
export type $SelectionPredicate = {
	[$then]: true
	[$else]: false
}

/**
 * 🧰 *type util*
 *
 * Flip the selection options.
 *
 * @example
 * ```ts
 * type IsBoolean<T, $Options = $SelectionOptions> = ...
 *
 * type IsNotBoolean<T, $Options = $SelectionOptions> = IsBoolean<T, $FlipSelection<$Options>>
 * ```
 */
export type $FlipSelection<$Options extends $SelectionOptions> = {
	[$then]: $Options['$else']
	[$else]: $Options['$then']
} & Omit<$Options, '$then' | '$else'>
