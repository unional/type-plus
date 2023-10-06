import { it } from '@jest/globals'
import { testType, type IsStrictObject, type $Then, type $Else } from '../index.js'


it('returns true for object', () => {
	testType.equal<IsStrictObject<object>, true>(true)
})

it('returns false for object literal', () => {
	testType.equal<IsStrictObject<{ a: number }>, false>(true)
})

it('returns false for empty object literal', () => {
	testType.equal<IsStrictObject<{}>, false>(true)
})

it('returns false if T is array or tuple', () => {
	testType.false<IsStrictObject<string[]>>(true)
	testType.false<IsStrictObject<[]>>(true)
	testType.false<IsStrictObject<[1, 2]>>(true)
})

it('returns false for special types', () => {
	testType.equal<IsStrictObject<any>, false>(true)
	testType.equal<IsStrictObject<unknown>, false>(true)
	testType.equal<IsStrictObject<never>, false>(true)
	testType.equal<IsStrictObject<void>, false>(true)
})

it('returns false for all other types', () => {
	testType.false<IsStrictObject<undefined>>(true)
	testType.false<IsStrictObject<null>>(true)
	testType.false<IsStrictObject<boolean>>(true)
	testType.false<IsStrictObject<true>>(true)
	testType.false<IsStrictObject<false>>(true)
	testType.false<IsStrictObject<number>>(true)
	testType.false<IsStrictObject<1>>(true)
	testType.false<IsStrictObject<string>>(true)
	testType.false<IsStrictObject<''>>(true)
	testType.false<IsStrictObject<symbol>>(true)
	testType.false<IsStrictObject<bigint>>(true)
	testType.false<IsStrictObject<1n>>(true)
})

it('distributes for union type', () => {
	testType.equal<IsStrictObject<object | 1>, boolean>(true)
	testType.equal<IsStrictObject<object | boolean>, boolean>(true)
	testType.equal<IsStrictObject<{ a: 1 } | 1>, false>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsStrictObject<{ a: 1 } | 1>, false>(true)
	testType.equal<IsStrictObject<{ a: 1 } | 1, { distributive: false }>, false>(true)
})

it('returns false for intersection type', () => {
	// `object` intersect with any non-object type always returns `never`,
	// and `object & object -> object` directly.
  // so there is no intersection type that can produce a strict object.
	testType.equal<IsStrictObject<object & Function>, false>(true)
	testType.false<IsStrictObject<object & []>>(true)
})

it('works as filter', () => {
	testType.equal<IsStrictObject<object, { selection: 'filter' }>, object>(true)
	testType.equal<IsStrictObject<{ a: 1 }, { selection: 'filter' }>, never>(true)

	testType.equal<IsStrictObject<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictObject<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsStrictObject<object | boolean, { selection: 'filter' }>, object>(true)
	testType.equal<IsStrictObject<{ a: 1 } | boolean, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsStrictObject<object, IsStrictObject.$Branch>, $Then>(true)
	testType.equal<IsStrictObject<{ a: 1 }, IsStrictObject.$Branch>, $Else>(true)

	testType.equal<IsStrictObject<any, IsStrictObject.$Branch>, $Else>(true)
	testType.equal<IsStrictObject<unknown, IsStrictObject.$Branch>, $Else>(true)
	testType.equal<IsStrictObject<never, IsStrictObject.$Branch>, $Else>(true)
	testType.equal<IsStrictObject<void, IsStrictObject.$Branch>, $Else>(true)

	testType.equal<IsStrictObject<object | 1, IsStrictObject.$Branch>, $Then | $Else>(true)
})
