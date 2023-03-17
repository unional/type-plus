import type { Any } from './Any.js'
import type { Array } from './Array.js'
// import { BigInt } from './BigInt.js'
import type { Boolean } from './Boolean.js'
import type { Null } from './Null.js'
import type { Number } from './Number.js'
import type { ObjectType } from './Object.js'
import type { Record } from './Record.js'
import type { String } from './String.js'
import type { Symbol } from './Symbol.js'
import type { Tuple } from './Tuple.js'
import type { Undefined } from './Undefined.js'
import type { Union } from './Union.js'
import type { Unknown } from './Unknown.js'

export type AllType =
	| Undefined
	| Null
	| Boolean
	| Number
	| String
	| ObjectType
	| Record
	| Array
	| Tuple
	// <https://www.rapidtables.com/math/symbols/Set_Symbols.html>
	| Union // | Intersection | SubSet | SuperSet | Complement | Diff
	| Unknown
	| Any
	| Symbol // | BigInt

export namespace AllType {
	export type PrimitiveValues = boolean | number | string // | bigint
	export type Analysis =
		| Any.Analysis
		| Unknown.Analysis
		| Undefined.Analysis
		| Null.Analysis
		| Boolean.Analysis
		| Number.Analysis
		| String.Analysis
		| Symbol.Analysis
		| ObjectType.Analysis
		| Record.Analysis
		| Array.Analysis
		| Tuple.Analysis
		| Union.Analysis
}
