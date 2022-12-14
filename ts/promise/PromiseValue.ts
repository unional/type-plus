/**
 * Gets value type from Promise
 * @deprecated Use `Awaited<T>` instead.
 */
export type PromiseValue<P extends Promise<any>> = P extends Promise<infer T> ? T : never
