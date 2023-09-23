import { it } from '@jest/globals'
import { testType, type IsNotAny, type $SelectionPredicate } from '../index.js'

it('returns false for any', () => {
	testType.equal<IsNotAny<any>, false>(true)
})

it('returns true for other special types', () => {
	testType.equal<IsNotAny<unknown>, true>(true)
	testType.equal<IsNotAny<void>, true>(true)
	testType.equal<IsNotAny<never>, true>(true)
})

it('returns true for other types', () => {
	testType.equal<IsNotAny<undefined>, true>(true)
	testType.equal<IsNotAny<null>, true>(true)
	testType.equal<IsNotAny<boolean>, true>(true)
	testType.equal<IsNotAny<true>, true>(true)
	testType.equal<IsNotAny<false>, true>(true)
	testType.equal<IsNotAny<number>, true>(true)
	testType.equal<IsNotAny<1>, true>(true)
	testType.equal<IsNotAny<string>, true>(true)
	testType.equal<IsNotAny<''>, true>(true)
	testType.equal<IsNotAny<symbol>, true>(true)
	testType.equal<IsNotAny<bigint>, true>(true)
	testType.equal<IsNotAny<1n>, true>(true)
	testType.equal<IsNotAny<{}>, true>(true)
	testType.equal<IsNotAny<string[]>, true>(true)
	testType.equal<IsNotAny<[]>, true>(true)
	testType.equal<IsNotAny<Function>, true>(true)
	testType.equal<IsNotAny<() => void>, true>(true)
})

it('returns false for union type', () => {
	testType.equal<any | 1, any>(true)
	testType.equal<IsNotAny<any | 1>, false>(true)
})

it('returns false for intersection type', () => {
	testType.equal<any & 1, any>(true)
	testType.equal<IsNotAny<any & 1>, false>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotAny<any, $SelectionPredicate>, false>(true)
	testType.equal<IsNotAny<0, $SelectionPredicate>, true>(true)

	testType.equal<IsNotAny<unknown, $SelectionPredicate>, true>(true)
	testType.equal<IsNotAny<never, $SelectionPredicate>, true>(true)
	testType.equal<IsNotAny<void, $SelectionPredicate>, true>(true)
})
