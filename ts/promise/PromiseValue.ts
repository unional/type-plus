import type { AnyRecord } from '../index.js'

/**
 * Gets value type from Promise
 * @deprecated Use `Awaited<T>` instead.
 */
export type PromiseValue<P extends Promise<any>> = P extends Promise<infer T> ? T : never

/**
 * Await on specific props V on type T
 */
export type AwaitedProp<T extends AnyRecord, K extends keyof T> = { [k in keyof T]: k extends K ? Awaited<T[k]> : T[k] }
