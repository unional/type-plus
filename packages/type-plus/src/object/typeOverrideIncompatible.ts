import type { ANotB, AnyRecord } from './index.js'

export function typeOverrideIncompatible<A extends AnyRecord>() {
	return <B extends AnyRecord>(source: B, override: ANotB<A, B>): A => ({
		...source,
		...override,
	})
}
