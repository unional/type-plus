import { IsFalse, PrimitiveTypes, type } from '../index.js'

it('returns true if T is false', () => {
	type.true<IsFalse<false>>(true)
})

it('returns false if T is boolean or true', () => {
	type.false<IsFalse<boolean>>(true)
	type.false<IsFalse<true>>(true)
})
it('returns false for special types', () => {
	type.false<IsFalse<void>>(true)
	type.false<IsFalse<unknown>>(true)
	type.false<IsFalse<any>>(true)
	type.false<IsFalse<never>>(true)
})

it('returns false for all other types', () => {
	type.false<IsFalse<undefined>>(true)
	type.false<IsFalse<null>>(true)
	type.false<IsFalse<number>>(true)
	type.false<IsFalse<1>>(true)
	type.false<IsFalse<boolean>>(true)
	type.false<IsFalse<true>>(true)
	type.false<IsFalse<string>>(true)
	type.false<IsFalse<''>>(true)
	type.false<IsFalse<symbol>>(true)
	type.false<IsFalse<bigint>>(true)
	type.false<IsFalse<{}>>(true)
	type.false<IsFalse<string[]>>(true)
	type.false<IsFalse<[]>>(true)
	type.false<IsFalse<Function>>(true)
	type.false<IsFalse<() => void>>(true)
})

it('returns false for union type', () => {
	type.false<IsFalse<PrimitiveTypes>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsFalse<false, 1, 2>, 1>(true)

	type.equal<IsFalse<any, 1, 2>, 2>(true)
	type.equal<IsFalse<unknown, 1, 2>, 2>(true)
	type.equal<IsFalse<never, 1, 2>, 2>(true)
	type.equal<IsFalse<void, 1, 2>, 2>(true)
})
