import type { AnyRecord } from './any_record.js'
import type { OptionalKeys } from './optional_key.js'
import type { RequiredKeys } from './RequiredKeys.js'

/**
 * ⚗️ *transform*
 *
 * Adjust `T` to work with compiler flag [exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig/#exactOptionalPropertyTypes).
 *
 * It adds `undefined` to optional properties.
 */
export type AdjustExactOptionalProps<T extends AnyRecord> = T extends object ?
	{ [K in OptionalKeys<T>]?: T[K] | undefined } &
	{ [K in RequiredKeys<T>]: T[K] }
	: never
