import type { ValueOf } from './ValueOf.js'
import type { IsDisjoint } from './IsDisjoint.js'
import type { AnyRecord } from './any_record.js'

export type KeysWithDiffType<A extends AnyRecord, B extends AnyRecord> = IsDisjoint<A, B> extends true
	? never
	: ValueOf<{
		[k in keyof A & keyof B]: A[k] extends B[k] ? never : k
	}>
