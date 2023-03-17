// IsNever from @jack-williams: https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379091887

// eslint-disable-next-line @typescript-eslint/ban-types
export type PrimitiveTypes =
	| boolean
	| number
	| string
	| object
	| symbol
	| bigint
	| Function
	| undefined
	| null

export type IsNever<T, Then = true, Else = false> = [T] extends [never] ? Then : Else
