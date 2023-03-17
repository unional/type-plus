/**
 * Get the last type of an array or tuple.
 */
export type Last<T extends any[]> = T extends [...any[], infer R] ? R : T[0]
