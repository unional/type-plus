import { type, type ArrayType } from '../index.js'

it('returns T if T is array', () => {
	type.equal<ArrayType<string[]>, string[]>(true)
})

it('returns never if T is tuple', () => {
	type.never<ArrayType<[]>>(true)
	type.never<ArrayType<[1]>>(true)
})

it('returns never for special types', () => {
	type.never<ArrayType<void>>(true)
	type.never<ArrayType<unknown>>(true)
	type.never<ArrayType<any>>(true)
	type.never<ArrayType<never>>(true)
})
it('returns never for all other types', () => {
	type.never<ArrayType<undefined>>(true)
	type.never<ArrayType<null>>(true)
	type.never<ArrayType<boolean>>(true)
	type.never<ArrayType<true>>(true)
	type.never<ArrayType<false>>(true)
	type.never<ArrayType<number>>(true)
	type.never<ArrayType<1>>(true)
	type.never<ArrayType<string>>(true)
	type.never<ArrayType<''>>(true)
	type.never<ArrayType<symbol>>(true)
	type.never<ArrayType<bigint>>(true)
	type.never<ArrayType<{}>>(true)
	type.never<ArrayType<[]>>(true)
	type.never<ArrayType<Function>>(true)
	type.never<ArrayType<() => void>>(true)
})

it('can override Then/Else', () => {
	type.equal<ArrayType<string[], 1, 2>, 1>(true)
	type.equal<ArrayType<[], 1, 2>, 2>(true)

	type.equal<ArrayType<any, 1, 2>, 2>(true)
	type.equal<ArrayType<unknown, 1, 2>, 2>(true)
	type.equal<ArrayType<never, 1, 2>, 2>(true)
	type.equal<ArrayType<void, 1, 2>, 2>(true)
})
