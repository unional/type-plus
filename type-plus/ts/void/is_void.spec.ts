import { it } from '@jest/globals'
import { testType, type $SelectionPredicate, type IsVoid } from '../index.js'

it('returns true for void', () => {
	testType.equal<IsVoid<void>, true>(true)
})

it('returns false for other special types', () => {
	testType.equal<IsVoid<any>, false>(true)
	testType.equal<IsVoid<unknown>, false>(true)
	testType.equal<IsVoid<never>, false>(true)
})

it('returns false for singular types', () => {
	testType.equal<IsVoid<undefined>, false>(true)
	testType.equal<IsVoid<null>, false>(true)
	testType.equal<IsVoid<number>, false>(true)
	testType.equal<IsVoid<1>, false>(true)
	testType.equal<IsVoid<boolean>, false>(true)
	testType.equal<IsVoid<true>, false>(true)
	testType.equal<IsVoid<false>, false>(true)
	testType.equal<IsVoid<string>, false>(true)
	testType.equal<IsVoid<''>, false>(true)
	testType.equal<IsVoid<symbol>, false>(true)
	testType.equal<IsVoid<bigint>, false>(true)
	testType.equal<IsVoid<1n>, false>(true)
	testType.equal<IsVoid<{}>, false>(true)
	testType.equal<IsVoid<string[]>, false>(true)
	testType.equal<IsVoid<[]>, false>(true)
	testType.equal<IsVoid<Function>, false>(true)
	testType.equal<IsVoid<() => void>, false>(true)
})

it('returns false for union type', () => {
	testType.equal<IsVoid<void | 1>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsVoid<void & { a: 1 }>, true>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsVoid<void, $SelectionPredicate>, true>(true)
	testType.equal<IsVoid<0, $SelectionPredicate>, false>(true)

	testType.equal<IsVoid<any, $SelectionPredicate>, false>(true)
	testType.equal<IsVoid<unknown, $SelectionPredicate>, false>(true)
	testType.equal<IsVoid<never, $SelectionPredicate>, false>(true)
})
