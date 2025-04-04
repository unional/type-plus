import type { IsEqual } from '../equal/is_equal.js'
import type { IsDisjoint } from './IsDisjoint.js'
import type { KeysWithDiffType } from './KeysWithDiffType.js'
import type { AnyRecord } from './any_record.js'

export type ANotB<A extends AnyRecord, B extends AnyRecord> = IsEqual<A, B> extends true
	? never
	: IsDisjoint<A, B> extends true
		? A
		: { [k in Exclude<keyof A, keyof B> | KeysWithDiffType<A, B>]: A[k] }

export type BNotA<A extends AnyRecord, B extends AnyRecord> = ANotB<B, A>
