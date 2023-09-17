export const typeSym = Symbol('type')
export const msgSym = Symbol('message')
export const valueSym = Symbol('value')

/**
 * Special `type-plus` interface to represent unique types with messages.
 */
export interface $Type<T extends string, V, M extends string = ''> {
	[typeSym]: T,
	[valueSym]: V,
	[msgSym]: M,
}
