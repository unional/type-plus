
/**
 * 🦴 *utilities*
 * ㊙️ *internal*
 *
 * Merge the input Options `I` with the default Options `D`.
 */
export type MergeOptions<I, D> = {
	[k in keyof D]: k extends keyof I ? I[k] : D[k]
}
