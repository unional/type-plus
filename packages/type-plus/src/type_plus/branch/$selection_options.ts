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
 *   $Options extends YourType.$Options = YourType.$Branch
 * > = ...
 *
 * namespace YourType {
 *   export type $Options = $SelectionOptions
 *   export type $Branch = $SelectionBranch
 * }
 * ```
 */
export type $SelectionOptions = {
	/**
	 * Specifies which default selection logic to use.
	 *
	 * `filter` returns `T` when the condition is met,
	 * and returns `never` otherwise.
	 *
	 * `predicate` returns boolean depends on the condition.
	 *
	 * Note that setting `$then` and `$else` overrides the default selection logic.
	 */
	selection?: 'predicate' | 'filter' | undefined
	$then?: unknown
	$else?: unknown
}
