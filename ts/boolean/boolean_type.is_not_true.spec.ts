import { IsNotTrue, type } from '../index.js'

it('returns false if T is true', () => {
	type.false<IsNotTrue<true>>(true)
})

it('returns true if T is boolean or false', () => {
	type.true<IsNotTrue<boolean>>(true)
	type.true<IsNotTrue<false>>(true)
})

it('returns true for special types', () => {
	type.true<IsNotTrue<void>>(true)
	type.true<IsNotTrue<unknown>>(true)
	type.true<IsNotTrue<any>>(true)
	type.true<IsNotTrue<never>>(true)
})

it('returns true for other types', () => {
	type.true<IsNotTrue<undefined>>(true)
	type.true<IsNotTrue<null>>(true)
	type.true<IsNotTrue<number>>(true)
	type.true<IsNotTrue<1>>(true)
	type.true<IsNotTrue<string>>(true)
	type.true<IsNotTrue<''>>(true)
	type.true<IsNotTrue<symbol>>(true)
	type.true<IsNotTrue<bigint>>(true)
	type.true<IsNotTrue<1n>>(true)
	type.true<IsNotTrue<{}>>(true)
	type.true<IsNotTrue<{ a: 1 }>>(true)
	type.true<IsNotTrue<string[]>>(true)
	type.true<IsNotTrue<[]>>(true)
	type.true<IsNotTrue<Function>>(true)
	type.true<IsNotTrue<() => void>>(true)
})

it('returns true for union type', () => {
	type.true<IsNotTrue<true | 1>>(true)
	type.true<IsNotTrue<true | boolean>>(true)
})

it('returns true for intersection type', () => {
	type.true<IsNotTrue<true & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<IsNotTrue<true, 1, 2>, 2>(true)
	type.equal<IsNotTrue<0, 1, 2>, 1>(true)

	type.equal<IsNotTrue<any, 1, 2>, 1>(true)
	type.equal<IsNotTrue<unknown, 1, 2>, 1>(true)
	type.equal<IsNotTrue<never, 1, 2>, 1>(true)
	type.equal<IsNotTrue<void, 1, 2>, 1>(true)
})
