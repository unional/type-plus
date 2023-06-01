export type Reverse<A extends unknown[]> = number extends A['length']
	? A
	: A['length'] extends 0
	? A
	: A['length'] extends 1
	? A
	: A extends [any, ...infer T]
	? T extends any[]
		? [...Reverse<T>, A[0]]
		: never
	: never
