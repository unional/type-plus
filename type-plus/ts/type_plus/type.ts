export const typeKey = Symbol('type')
export const valueKey = Symbol('value')
export const msgKey = Symbol('message')

/**
 * Special `type-plus` interface to represent unique types with messages.
 */
export interface $Type<T extends string, V, M extends string = ''> {
	[typeKey]: T,
	[valueKey]: V,
	[msgKey]: M,
}
