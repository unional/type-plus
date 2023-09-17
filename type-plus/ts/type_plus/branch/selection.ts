import type { $Type } from '../type.js'

/**
 * 🧰 *type util*
 *
 * Options for selection (if-then-else) logic.
 *
 * The word "selection" refers to the basic elements in structural programming:
 * sequence, selection, and iteration.
 *
 * @example
 * ```ts
 * type YourType<
 *   T,
 *   $Options extends YourType.$Options = YourType.$Default
 * > = ...
 *
 * namespace YourType {
 *   export type $Options = $SelectionOptions
 *   export type $Default = $SelectionFilter
 *   export type $Override = $SelectionOverride
 * }
 * ```
 */
export type $SelectionOptions = {
	$then?: unknown,
	$else?: unknown,
}

export type $Then = $Type<'branch', 'then'>
export type $Else = $Type<'branch', 'else'>

/**
 * 🧰 *type util*
 *
 * Override option for specifically overriding the selection logic.
 *
 * Use this to finely customize the behavior of your type.
 *
 * ```ts
 * type YourType<
 *   T,
 *   $Options extends YourType.$Options = YourType.$Default
 * > = ...
 *
 * namespace YourType {
 *   export type $Options = $SelectionOptions
 *   export type $Default = $SelectionFilter
 *   export type $Override = $SelectionOverride
 * }
 *
 * type R = YourType<T, YourType.$Override> extends infer R
 *   ? R extends $Then ? HandleThen
 *   : R extends $Else ? HandleElse
 *   : never
 * ```
 */
export type $SelectionOverride = {
	$then: $Then,
	$else: $Else,
}

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
	$then: T,
	$else: never,
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
	$then: true,
	$else: false
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
	$then: $Options['$else'],
	$else: $Options['$then']
} & Omit<$Options, '$then' | '$else'>
