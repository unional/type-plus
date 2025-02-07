/**
 * Merge type options.
 *
 * This is used in the type to merge the user provided options with the default options.
 */
export type $MergeOptions<$O extends Record<string, any>, $V extends { [k in keyof $O]?: unknown }> = {
	[k in Exclude<keyof $O, keyof $V>]: $O[k]
} & $V
