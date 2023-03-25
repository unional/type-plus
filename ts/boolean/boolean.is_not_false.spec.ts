import { IsNotFalse, PrimitiveTypes, type } from '../index.js'

it('returns false if T is false', () => {
	type.false<IsNotFalse<false>>(true)
})

it('returns true if T is boolean or true', () => {
	type.true<IsNotFalse<boolean>>(true)
	type.true<IsNotFalse<true>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotFalse<void>>(true)
	type.true<IsNotFalse<unknown>>(true)
	type.true<IsNotFalse<any>>(true)
	type.true<IsNotFalse<never>>(true)
})

it('returns true for all other types', () => {
	type.true<IsNotFalse<undefined>>(true)
	type.true<IsNotFalse<null>>(true)
	type.true<IsNotFalse<number>>(true)
	type.true<IsNotFalse<1>>(true)
	type.true<IsNotFalse<boolean>>(true)
	type.true<IsNotFalse<true>>(true)
	type.true<IsNotFalse<string>>(true)
	type.true<IsNotFalse<''>>(true)
	type.true<IsNotFalse<symbol>>(true)
	type.true<IsNotFalse<bigint>>(true)
	type.true<IsNotFalse<{}>>(true)
	type.true<IsNotFalse<string[]>>(true)
	type.true<IsNotFalse<[]>>(true)
	type.true<IsNotFalse<Function>>(true)
	type.true<IsNotFalse<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotFalse<PrimitiveTypes>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotFalse<false, 1, 2>, 2>(true)

	type.equal<IsNotFalse<any, 1, 2>, 1>(true)
	type.equal<IsNotFalse<unknown, 1, 2>, 1>(true)
	type.equal<IsNotFalse<never, 1, 2>, 1>(true)
	type.equal<IsNotFalse<void, 1, 2>, 1>(true)
})
