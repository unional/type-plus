import { type, type StrictStringType } from '../index.js'

it('returns T if T is string', () => {
	type.equal<StrictStringType<string>, string>(true)
})

it('returns never if T is a string literal', () => {
	type.never<StrictStringType<''>>(true)
	type.never<StrictStringType<'a'>>(true)
})

it('returns never for special types', () => {
	type.never<StrictStringType<any>>(true)
	type.never<StrictStringType<unknown>>(true)
	type.never<StrictStringType<void>>(true)
	type.never<StrictStringType<never>>(true)
})

it('returns never for other types', () => {
	type.never<StrictStringType<undefined>>(true)
	type.never<StrictStringType<null>>(true)
	type.never<StrictStringType<boolean>>(true)
	type.never<StrictStringType<true>>(true)
	type.never<StrictStringType<false>>(true)
	type.never<StrictStringType<number>>(true)
	type.never<StrictStringType<1>>(true)
	type.never<StrictStringType<''>>(true)
	type.never<StrictStringType<symbol>>(true)
	type.never<StrictStringType<bigint>>(true)
	type.never<StrictStringType<{}>>(true)
	type.never<StrictStringType<string[]>>(true)
	type.never<StrictStringType<[]>>(true)
	type.never<StrictStringType<Function>>(true)
	type.never<StrictStringType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<StrictStringType<string | 1>>(true)
})

it('returns never for intersection type', () => {
	type.equal<StrictStringType<string & { a: 1 }>, never>(true)
})

it('can override Then/Else', () => {
	type.equal<StrictStringType<string, 1, 2>, 1>(true)
	type.equal<StrictStringType<'', 1, 2>, 2>(true)
	type.equal<StrictStringType<'a', 1, 2>, 2>(true)

	type.equal<StrictStringType<any, 1, 2>, 2>(true)
	type.equal<StrictStringType<unknown, 1, 2>, 2>(true)
	type.equal<StrictStringType<never, 1, 2>, 2>(true)
	type.equal<StrictStringType<void, 1, 2>, 2>(true)
})
