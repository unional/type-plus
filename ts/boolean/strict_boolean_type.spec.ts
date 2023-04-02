import { testType, type StrictBooleanType } from '../index.js'

it('returns boolean if T is boolean', () => {
	testType.equal<StrictBooleanType<boolean>, boolean>(true)
})

it('returns never if T is true or false literal', () => {
	testType.never<StrictBooleanType<true>>(true)
	testType.never<StrictBooleanType<false>>(true)
})

it('returns never for special types', () => {
	testType.never<StrictBooleanType<void>>(true)
	testType.never<StrictBooleanType<unknown>>(true)
	testType.never<StrictBooleanType<any>>(true)
	testType.never<StrictBooleanType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<StrictBooleanType<undefined>>(true)
	testType.never<StrictBooleanType<null>>(true)
	testType.never<StrictBooleanType<number>>(true)
	testType.never<StrictBooleanType<1>>(true)
	testType.never<StrictBooleanType<string>>(true)
	testType.never<StrictBooleanType<''>>(true)
	testType.never<StrictBooleanType<symbol>>(true)
	testType.never<StrictBooleanType<bigint>>(true)
	testType.never<StrictBooleanType<1n>>(true)
	testType.never<StrictBooleanType<{}>>(true)
	testType.never<StrictBooleanType<{ a: 1 }>>(true)
	testType.never<StrictBooleanType<string[]>>(true)
	testType.never<StrictBooleanType<[]>>(true)
	testType.never<StrictBooleanType<Function>>(true)
	testType.never<StrictBooleanType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<StrictBooleanType<boolean | 1>>(true)
})

it('returns never for intersection type', () => {
	testType.never<StrictBooleanType<boolean & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<StrictBooleanType<boolean, 1, 2>, 1>(true)
	testType.equal<StrictBooleanType<true, 1, 2>, 2>(true)
	testType.equal<StrictBooleanType<false, 1, 2>, 2>(true)

	testType.equal<StrictBooleanType<any, 1, 2>, 2>(true)
	testType.equal<StrictBooleanType<unknown, 1, 2>, 2>(true)
	testType.equal<StrictBooleanType<never, 1, 2>, 2>(true)
	testType.equal<StrictBooleanType<void, 1, 2>, 2>(true)
})
