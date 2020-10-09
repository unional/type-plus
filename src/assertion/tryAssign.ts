/**
 * tries assigning `from` to `to`.
 * If assignment is possible,
 * the return type is the resulting type.
 * If assignment is not possible,
 * the return type is `never`.
 */
export function tryAssign<S, T>(from: S, _to: T): Extract<T, S> { return from as any }
