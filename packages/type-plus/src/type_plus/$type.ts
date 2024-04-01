/**
 * 🧰 *type util*
 *
 * Special `type-plus` interface to represent unique types with messages.
 */
export interface $Type<T extends string, M extends string = '', V = unknown> {
	type: T
	message: M
	value: V
}
