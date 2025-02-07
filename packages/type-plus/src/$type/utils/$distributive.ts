export namespace $Distributive {
	/**
	 * Options for controlling if the type is distributive.
	 */
	export type Options = {
		distributive?: boolean | undefined
	}

	/**
	 * Default options for `distributive` behavior.
	 *
	 * By default it is `true`.
	 */
	export type Default = {
		distributive: true
	}
}
