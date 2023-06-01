import { it } from '@jest/globals'
import { testType, type Is_Never, type NeverType, type Not_Never } from '../index.js'

it('returns never if T is never', () => {
	testType.equal<NeverType<never>, never>(true)
})

it('returns Not_Never for other special types', () => {
	testType.equal<NeverType<unknown>, Not_Never>(true)
	testType.equal<NeverType<void>, Not_Never>(true)
	testType.equal<NeverType<any>, Not_Never>(true)
})

it('returns Not_Never for other types', () => {
	testType.equal<NeverType<undefined>, Not_Never>(true)
	testType.equal<NeverType<null>, Not_Never>(true)
	testType.equal<NeverType<number>, Not_Never>(true)
	testType.equal<NeverType<boolean>, Not_Never>(true)
	testType.equal<NeverType<true>, Not_Never>(true)
	testType.equal<NeverType<false>, Not_Never>(true)
	testType.equal<NeverType<string>, Not_Never>(true)
	testType.equal<NeverType<''>, Not_Never>(true)
	testType.equal<NeverType<symbol>, Not_Never>(true)
	testType.equal<NeverType<bigint>, Not_Never>(true)
	testType.equal<NeverType<{}>, Not_Never>(true)
	testType.equal<NeverType<string[]>, Not_Never>(true)
	testType.equal<NeverType<[]>, Not_Never>(true)
	testType.equal<NeverType<Function>, Not_Never>(true)
	testType.equal<NeverType<() => void>, Not_Never>(true)
})

it('returns Not_Never for union type', () => {
	testType.equal<NeverType<never | 1>, Not_Never>(true)
})

it('returns never for intersection type', () => {
	testType.never<never & { a: 1 }>(true)
	testType.never<NeverType<never & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<NeverType<never, 1, 2>, 1>(true)
	testType.equal<NeverType<0, 1, 2>, 2>(true)

	testType.equal<NeverType<any, 1, 2>, 2>(true)
	testType.equal<NeverType<unknown, 1, 2>, 2>(true)
	testType.equal<NeverType<void, 1, 2>, 2>(true)
})

it('Is_Never and Not_Never is not the same', () => {
	testType.equal<Is_Never, Not_Never>(false)
})
