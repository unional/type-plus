import { isType, type UndefinedType } from '../index.js'

it('returns undefined for undefined', () => {
	isType.equal<true, undefined, UndefinedType<undefined>>()
})

it('returns never for other special types', () => {
	isType.equal<true, never, UndefinedType<any>>()
	isType.equal<true, never, UndefinedType<unknown>>()
	isType.equal<true, never, UndefinedType<void>>()
	isType.equal<true, never, UndefinedType<never>>()
})

test('returns never for singular types', () => {
	isType.equal<true, never, UndefinedType<null>>()
	isType.equal<true, never, UndefinedType<number>>()
	isType.equal<true, never, UndefinedType<boolean>>()
	isType.equal<true, never, UndefinedType<true>>()
	isType.equal<true, never, UndefinedType<false>>()
	isType.equal<true, never, UndefinedType<string>>()
	isType.equal<true, never, UndefinedType<''>>()
	isType.equal<true, never, UndefinedType<symbol>>()
	isType.equal<true, never, UndefinedType<bigint>>()
	isType.equal<true, never, UndefinedType<{}>>()
	isType.equal<true, never, UndefinedType<string[]>>()
	isType.equal<true, never, UndefinedType<[]>>()
	isType.equal<true, never, UndefinedType<Function>>()
	isType.equal<true, never, UndefinedType<() => void>>()
})

it('returns never for union type', () => {
	isType.equal<true, never, UndefinedType<undefined | 1>>()
})

it('returns never for intersection type', () => {
	isType.equal<true, never, UndefinedType<{} & {}>>()
})

it('can override Then/Else', () => {
	isType.equal<true, 1, UndefinedType<undefined, 1, 2>>()
	// isType.equal<true, 2, UndefinedType<never, 1, 2>>()
})
