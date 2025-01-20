import type { IsEqual } from '../equal/equal.js'
import type { IsDisjoint } from './IsDisjoint.js'
import type { AnyRecord } from './any_record.js'
import type { Properties } from './properties.js'

export type LeftJoin<A extends AnyRecord, B extends AnyRecord> = IsEqual<A, B> extends true
	? A
	: IsDisjoint<A, B> extends true
		? A & B
		: Properties<{ [k in Exclude<keyof A, keyof B>]: A[k] } & { [k in keyof B]: B[k] }>
