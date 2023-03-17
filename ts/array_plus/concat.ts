/**
 * Combines two or more arrays.
 */
export type Concat<A extends any[], B extends any[]> = [...A, ...B]
