import { it } from '@jest/globals'
import { testType, type $Else, type $Then, type IsNotStrictObject } from '../index.js'


it('returns false for object', () => {
	testType.equal<IsNotStrictObject<object>, false>(true)
})

it('returns true for object literal', () => {
	testType.equal<IsNotStrictObject<{ a: number }>, true>(true)
})

it('returns true for empty object literal', () => {
	testType.equal<IsNotStrictObject<{}>, true>(true)
})

it('returns true if T is array or tuple', () => {
	testType.true<IsNotStrictObject<string[]>>(true)
	testType.true<IsNotStrictObject<[]>>(true)
	testType.true<IsNotStrictObject<[1, 2]>>(true)
})

it('returns true for special types', () => {
	testType.equal<IsNotStrictObject<any>, true>(true)
	testType.equal<IsNotStrictObject<unknown>, true>(true)
	testType.equal<IsNotStrictObject<never>, true>(true)
	testType.equal<IsNotStrictObject<void>, true>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotStrictObject<undefined>>(true)
	testType.true<IsNotStrictObject<null>>(true)
	testType.true<IsNotStrictObject<boolean>>(true)
	testType.true<IsNotStrictObject<true>>(true)
	testType.true<IsNotStrictObject<false>>(true)
	testType.true<IsNotStrictObject<number>>(true)
	testType.true<IsNotStrictObject<1>>(true)
	testType.true<IsNotStrictObject<string>>(true)
	testType.true<IsNotStrictObject<''>>(true)
	testType.true<IsNotStrictObject<symbol>>(true)
	testType.true<IsNotStrictObject<bigint>>(true)
	testType.true<IsNotStrictObject<1n>>(true)
})

it('distributes for union type', () => {
	testType.equal<IsNotStrictObject<object | 1>, boolean>(true)
	testType.equal<IsNotStrictObject<object | boolean>, boolean>(true)
	testType.equal<IsNotStrictObject<{ a: 1 } | 1>, true>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotStrictObject<{ a: 1 } | 1>, true>(true)
	testType.equal<IsNotStrictObject<{ a: 1 } | 1, { distributive: false }>, true>(true)
})

it('returns true for intersection type', () => {
	// `object` intersect with any non-object type always returns `never`,
	// and `object & object -> object` directly.
	// so there is no intersection type that can produce a strict object.
	testType.equal<IsNotStrictObject<object & Function>, true>(true)
	testType.true<IsNotStrictObject<object & []>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotStrictObject<object, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStrictObject<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)

	testType.equal<IsNotStrictObject<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStrictObject<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotStrictObject<object | boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsNotStrictObject<{ a: 1 } | boolean, { selection: 'filter' }>, { a: 1 } | boolean>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotStrictObject<object, IsNotStrictObject.$Branch>, $Else>(true)
	testType.equal<IsNotStrictObject<{ a: 1 }, IsNotStrictObject.$Branch>, $Then>(true)

	testType.equal<IsNotStrictObject<any, IsNotStrictObject.$Branch>, $Then>(true)
	testType.equal<IsNotStrictObject<unknown, IsNotStrictObject.$Branch>, $Then>(true)
	testType.equal<IsNotStrictObject<never, IsNotStrictObject.$Branch>, $Then>(true)
	testType.equal<IsNotStrictObject<void, IsNotStrictObject.$Branch>, $Then>(true)

	testType.equal<IsNotStrictObject<object | 1, IsNotStrictObject.$Branch>, $Then | $Else>(true)
})
