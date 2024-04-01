import type { $ExtractManipulatedString } from './$extract_manipulated_string.js'

export type _StringType<T extends string> = $ExtractManipulatedString<T> extends infer K
	? K extends string & infer U
		? [K, U] extends [U, K]
			? {} extends { [P in `${K}`]: unknown }
				? 'templateLiteral'
				: 'stringLiteral'
			: 'string'
		: never
	: never
