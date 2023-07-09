import type { NeverType } from '../never/never_type.js'
import type { TypePlusOptions, MergeOptions } from '../utils/options.js'
import type { LooseArrayType } from './loose_array_type.js'

export type IsReadonly<A, Options extends IsReadonly.Options = {
	caseTrue: true,
	caseFalse: false,
	caseNever: false,
	caseNotArray: false
}> = MergeOptions<Options, IsReadonly.DefaultOptions> extends infer O extends IsReadonly.Options ?
	NeverType<
		A,
		O['caseNever'],
		A extends any ?
		LooseArrayType<A,
			Readonly<A> extends A ? O['caseThen'] : O['caseElse'],
			O['caseNotArray']
		> : never
	>
	: never

export namespace IsReadonly {
	export interface Options extends NeverType.Options, TypePlusOptions.Predicate {
		caseNotArray?: unknown
	}

	export interface DefaultOptions {
		caseThen: true,
		caseElse: false,
		caseNever: false,
		caseNotArray: false
	}
}
