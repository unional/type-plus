export namespace TypePlusOptions {
	/**
	 * 🦴 *utilities*
	 * ㊙️ *internal*
	 *
	 * Merge the input Options `I` with the default Options `D`.
	 */
	export type Merge<I, D> = {
		[k in keyof D]: k extends keyof I ? I[k] : D[k]
	}

	/**
	 * 🦴 *utilities*
	 * ㊙️ *internal*
	 *
	 * Selection (if-then-else) options.
	 *
	 * The word "selection" refers to the basic elements in structural programming:
	 * sequence, selection, and iteration.
	 */
	export interface Selection {
		$then?: unknown,
		$else?: unknown,
	}

	export interface NotArray {
		$notArray?: unknown
	}
}
