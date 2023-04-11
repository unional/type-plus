import type { StringIncludes } from './string.js'

export namespace StringPlus {
	export type Includes<S, Search, Then = true, Else = false> = StringIncludes<
		S,
		Search,
		Then,
		Else
	>
}
