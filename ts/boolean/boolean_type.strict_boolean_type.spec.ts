import { type, type StrictBooleanType } from '../index.js'

it('returns boolean if T is boolean', () => {
	type.equal<StrictBooleanType<boolean>, boolean>(true)
})

it('returns never if T is true or false literal', () => {
	type.never<StrictBooleanType<true>>(true)
	type.never<StrictBooleanType<false>>(true)
})

it('returns never for special types', () => {
	type.never<StrictBooleanType<void>>(true)
	type.never<StrictBooleanType<unknown>>(true)
	type.never<StrictBooleanType<any>>(true)
	type.never<StrictBooleanType<never>>(true)
})

it('returns never for other types', () => {
	type.never<StrictBooleanType<undefined>>(true)
	type.never<StrictBooleanType<null>>(true)
	type.never<StrictBooleanType<number>>(true)
	type.never<StrictBooleanType<1>>(true)
	type.never<StrictBooleanType<string>>(true)
	type.never<StrictBooleanType<''>>(true)
	type.never<StrictBooleanType<symbol>>(true)
	type.never<StrictBooleanType<bigint>>(true)
	type.never<StrictBooleanType<1n>>(true)
	type.never<StrictBooleanType<{}>>(true)
	type.never<StrictBooleanType<{ a: 1 }>>(true)
	type.never<StrictBooleanType<string[]>>(true)
	type.never<StrictBooleanType<[]>>(true)
	type.never<StrictBooleanType<Function>>(true)
	type.never<StrictBooleanType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<StrictBooleanType<boolean | 1>>(true)
})

it('returns never for intersection type', () => {
	type.never<StrictBooleanType<boolean & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<StrictBooleanType<boolean, 1, 2>, 1>(true)
	type.equal<StrictBooleanType<true, 1, 2>, 2>(true)
	type.equal<StrictBooleanType<false, 1, 2>, 2>(true)

	type.equal<StrictBooleanType<any, 1, 2>, 2>(true)
	type.equal<StrictBooleanType<unknown, 1, 2>, 2>(true)
	type.equal<StrictBooleanType<never, 1, 2>, 2>(true)
	type.equal<StrictBooleanType<void, 1, 2>, 2>(true)
})
