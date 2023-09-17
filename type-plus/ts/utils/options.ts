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

	export interface NotArray {
		$notArray?: unknown
	}
}
