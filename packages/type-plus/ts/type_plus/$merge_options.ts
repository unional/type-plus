/**
 * 🧰 *type util*
 *
 * Merge type options.
 */
export type $MergeOptions<
	$O extends Record<string, any>,
	$V extends { [k in keyof $O]?: unknown }
> = { [k in Exclude<keyof $O, keyof $V>]: $O[k] } & $V
