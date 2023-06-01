import type { And, Not } from '../predicates/index.js'
import type { AnyRecord } from './AnyRecord.js'
import type { HasKey } from './hasKey.js'

/**
 * Are the two records disjoint from each other.
 * Disjoint means no common property.
 */
export type IsDisjoint<A extends AnyRecord, B extends AnyRecord> = And<
	Not<HasKey<A, keyof B>>,
	Not<HasKey<B, keyof A>>
>
