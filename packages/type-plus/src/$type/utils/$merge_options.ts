/**
 * Merge type options.
 *
 * This is used in the type to merge the user provided options with the default options.
 *
 * @typeparam $O - The type of the options, typically provided by the user.
 * @typeparam $P - The type of the default options.
 */
export type $MergeOptions<$O extends Record<string, any>, $P extends { [k in keyof $O]?: unknown }> = {
	[k in Exclude<keyof $O, keyof $P>]: $O[k]
} & $P
