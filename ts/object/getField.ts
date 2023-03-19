import type { UnionKeys } from '../UnionKeys.js'

export function getField<T, TX extends Exclude<T, undefined | null>, K extends UnionKeys<TX>>(
	subject: T,
	key: K
): TX[K]
export function getField<
	T,
	TX extends Exclude<T, undefined | null>,
	K extends UnionKeys<TX>,
	DV extends Exclude<TX[K], undefined>
>(subject: T, key: K, defaultValue: DV): DV
export function getField<
	T,
	TX extends Exclude<T, undefined | null>,
	K extends UnionKeys<TX>,
	DV extends Exclude<TX[K], undefined>
>(subject: T, key: K, defaultValue?: DV) {
	return (subject && (subject as unknown as { [k in K]: TX[K] | DV })[key]) || defaultValue
}
