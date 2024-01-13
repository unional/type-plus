/**
 * Exclude type U from properties in T.
 */
export type ExcludePropType<T extends Record<keyof any, any>, U> = {
	[k in keyof T]: Exclude<T[k], U>
}
