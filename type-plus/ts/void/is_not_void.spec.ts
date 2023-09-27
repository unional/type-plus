import { it } from '@jest/globals'
import { testType, type $Else, type $Then, type IsNotVoid } from '../index.js'

it('returns false for void', () => {
	testType.equal<IsNotVoid<void>, false>(true)
})

it('returns true for other special types', () => {
	testType.equal<IsNotVoid<any>, true>(true)
	testType.equal<IsNotVoid<unknown>, true>(true)
	testType.equal<IsNotVoid<never>, true>(true)
})

it('returns true for other types', () => {
	testType.equal<IsNotVoid<undefined>, true>(true)
	testType.equal<IsNotVoid<null>, true>(true)
	testType.equal<IsNotVoid<number>, true>(true)
	testType.equal<IsNotVoid<boolean>, true>(true)
	testType.equal<IsNotVoid<true>, true>(true)
	testType.equal<IsNotVoid<false>, true>(true)
	testType.equal<IsNotVoid<string>, true>(true)
	testType.equal<IsNotVoid<''>, true>(true)
	testType.equal<IsNotVoid<symbol>, true>(true)
	testType.equal<IsNotVoid<bigint>, true>(true)
	testType.equal<IsNotVoid<{}>, true>(true)
	testType.equal<IsNotVoid<string[]>, true>(true)
	testType.equal<IsNotVoid<[]>, true>(true)
	testType.equal<IsNotVoid<Function>, true>(true)
	testType.equal<IsNotVoid<() => void>, true>(true)
})

it('distributes for union type', () => {
	testType.equal<IsNotVoid<void | 1>, boolean>(true)
})

it('returns false for intersection type', () => {
	testType.equal<IsNotVoid<void & { a: 1 }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsNotVoid<void, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotVoid<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotVoid<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotVoid<string | boolean, { selection: 'filter' }>, string|boolean>(true)

	testType.equal<string | never, string>(true)
	testType.equal<IsNotVoid<string | void, { selection: 'filter' }>, string>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotVoid<void | 1>, boolean>(true)
	testType.equal<void | 1, void>(false)
	testType.equal<IsNotVoid<void | 1, { distributive: false }>, true>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotVoid<void, IsNotVoid.$Branch>, $Else>(true)

	testType.equal<IsNotVoid<any, IsNotVoid.$Branch>, $Then>(true)
	testType.equal<IsNotVoid<unknown, IsNotVoid.$Branch>, $Then>(true)
	testType.equal<IsNotVoid<never, IsNotVoid.$Branch>, $Then>(true)
	testType.equal<IsNotVoid<undefined, IsNotVoid.$Branch>, $Then>(true)

	testType.equal<IsNotVoid<void | 1, IsNotVoid.$Branch>, $Then | $Else>(true)
})
