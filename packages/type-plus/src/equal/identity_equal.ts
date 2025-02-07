import type { Equal } from './equal.js'

/**
 * This is a common equal check.
 * It is good for some basic cases, but not for all.
 */
export type IdentityEqual<A, B, Then, Else> = Equal.$Same<A, B, { $then: Then; $else: Else }>
