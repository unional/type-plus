/**
 * 🧰 *type util*
 *
 * Options for to control if the type is distributive.
 */
export namespace $Distributive {
	export type Options = {
		distributive?: boolean | undefined
	}

	/**
	 * 🧰 *type util*
	 *
	 * Default options for `distributive` behavior.
	 *
	 * By default it is `true`.
	 */
	export type Default = {
		distributive: true
	}
}
