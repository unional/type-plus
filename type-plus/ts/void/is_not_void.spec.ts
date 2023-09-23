import { it } from '@jest/globals'
import { testType, type $Else, type $SelectionPredicate, type $Then, type IsNotVoid } from '../index.js'

it('returns false for void', () => {
	testType.equal<IsNotVoid<void>, $Else>(true)
})

it('returns true for other special types', () => {
	testType.equal<IsNotVoid<any>, $Then>(true)
	testType.equal<IsNotVoid<unknown>, $Then>(true)
	testType.equal<IsNotVoid<never>, $Then>(true)
})

it('returns true for other types', () => {
	testType.equal<IsNotVoid<undefined>, $Then>(true)
	testType.equal<IsNotVoid<null>, $Then>(true)
	testType.equal<IsNotVoid<number>, $Then>(true)
	testType.equal<IsNotVoid<boolean>, $Then>(true)
	testType.equal<IsNotVoid<true>, $Then>(true)
	testType.equal<IsNotVoid<false>, $Then>(true)
	testType.equal<IsNotVoid<string>, $Then>(true)
	testType.equal<IsNotVoid<''>, $Then>(true)
	testType.equal<IsNotVoid<symbol>, $Then>(true)
	testType.equal<IsNotVoid<bigint>, $Then>(true)
	testType.equal<IsNotVoid<{}>, $Then>(true)
	testType.equal<IsNotVoid<string[]>, $Then>(true)
	testType.equal<IsNotVoid<[]>, $Then>(true)
	testType.equal<IsNotVoid<Function>, $Then>(true)
	testType.equal<IsNotVoid<() => void>, $Then>(true)
})

it('returns true for union type', () => {
	testType.equal<IsNotVoid<void | 1>, $Then>(true)
})

it('returns false for intersection type', () => {
	testType.equal<IsNotVoid<void & { a: 1 }>, $Else>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotVoid<void, $SelectionPredicate>, false>(true)
	testType.equal<IsNotVoid<0, $SelectionPredicate>, true>(true)

	testType.equal<IsNotVoid<any, $SelectionPredicate>, true>(true)
	testType.equal<IsNotVoid<unknown, $SelectionPredicate>, true>(true)
	testType.equal<IsNotVoid<never, $SelectionPredicate>, true>(true)
})
