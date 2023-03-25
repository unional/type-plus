import { type, type UndefinedType } from '../index.js'

it('returns T if T is undefined', () => {
	type.equal<UndefinedType<undefined>, undefined>(true)
})

it('returns never for special types', () => {
	type.never<UndefinedType<any>>(true)
	type.never<UndefinedType<unknown>>(true)
	type.never<UndefinedType<void>>(true)
	type.never<UndefinedType<never>>(true)
})

test('returns never for other types', () => {
	type.never<UndefinedType<null>>(true)
	type.never<UndefinedType<number>>(true)
	type.never<UndefinedType<1>>(true)
	type.never<UndefinedType<boolean>>(true)
	type.never<UndefinedType<true>>(true)
	type.never<UndefinedType<false>>(true)
	type.never<UndefinedType<string>>(true)
	type.never<UndefinedType<''>>(true)
	type.never<UndefinedType<symbol>>(true)
	type.never<UndefinedType<bigint>>(true)
	type.never<UndefinedType<1n>>(true)
	type.never<UndefinedType<{}>>(true)
	type.never<UndefinedType<string[]>>(true)
	type.never<UndefinedType<[]>>(true)
	type.never<UndefinedType<Function>>(true)
	type.never<UndefinedType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<UndefinedType<undefined | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<UndefinedType<undefined, 1, 2>, 1>(true)
	type.equal<UndefinedType<0, 1, 2>, 2>(true)

	type.equal<UndefinedType<any, 1, 2>, 2>(true)
	type.equal<UndefinedType<unknown, 1, 2>, 2>(true)
	type.equal<UndefinedType<never, 1, 2>, 2>(true)
	type.equal<UndefinedType<void, 1, 2>, 2>(true)
})
