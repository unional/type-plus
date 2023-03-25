import { type, type StringType } from '../index.js'

it('returns T if T is string', () => {
	type.equal<StringType<string>, string>(true)
})

it('returns never if T is a string literal', () => {
	type.never<StringType<''>>(true)
	type.never<StringType<'a'>>(true)
})

it('returns never for special types', () => {
	type.never<StringType<any>>(true)
	type.never<StringType<unknown>>(true)
	type.never<StringType<void>>(true)
	type.never<StringType<never>>(true)
})

test('returns never for other types', () => {
	type.never<StringType<undefined>>(true)
	type.never<StringType<null>>(true)
	type.never<StringType<boolean>>(true)
	type.never<StringType<true>>(true)
	type.never<StringType<false>>(true)
	type.never<StringType<number>>(true)
	type.never<StringType<1>>(true)
	type.never<StringType<''>>(true)
	type.never<StringType<symbol>>(true)
	type.never<StringType<bigint>>(true)
	type.never<StringType<{}>>(true)
	type.never<StringType<string[]>>(true)
	type.never<StringType<[]>>(true)
	type.never<StringType<Function>>(true)
	type.never<StringType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<StringType<string | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<StringType<string, 1, 2>, 1>(true)
	type.equal<StringType<'', 1, 2>, 2>(true)
	type.equal<StringType<'a', 1, 2>, 2>(true)

	type.equal<StringType<any, 1, 2>, 2>(true)
	type.equal<StringType<unknown, 1, 2>, 2>(true)
	type.equal<StringType<never, 1, 2>, 2>(true)
	type.equal<StringType<void, 1, 2>, 2>(true)
})
