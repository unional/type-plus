import { it } from '@jest/globals'
import { testType, type NotStrictArrayType } from '../index.js'

it('returns never if T is array', () => {
	testType.never<NotStrictArrayType<string[]>>(true)
})

it('returns T if T is tuple', () => {
	testType.equal<NotStrictArrayType<[]>, []>(true)
	testType.equal<NotStrictArrayType<[1]>, [1]>(true)
})

it('returns T for special types', () => {
	testType.equal<NotStrictArrayType<void>, void>(true)
	testType.equal<NotStrictArrayType<unknown>, unknown>(true)
	testType.equal<NotStrictArrayType<any>, any>(true)
	testType.equal<NotStrictArrayType<never>, never>(true)
})
it('returns T for other types', () => {
	testType.equal<NotStrictArrayType<undefined>, undefined>(true)
	testType.equal<NotStrictArrayType<null>, null>(true)
	testType.equal<NotStrictArrayType<boolean>, boolean>(true)
	testType.equal<NotStrictArrayType<true>, true>(true)
	testType.equal<NotStrictArrayType<false>, false>(true)
	testType.equal<NotStrictArrayType<number>, number>(true)
	testType.equal<NotStrictArrayType<1>, 1>(true)
	testType.equal<NotStrictArrayType<string>, string>(true)
	testType.equal<NotStrictArrayType<''>, ''>(true)
	testType.equal<NotStrictArrayType<symbol>, symbol>(true)
	testType.equal<NotStrictArrayType<bigint>, bigint>(true)
	testType.equal<NotStrictArrayType<1n>, 1n>(true)
	testType.equal<NotStrictArrayType<{}>, {}>(true)
	testType.equal<NotStrictArrayType<{ a: 1 }>, { a: 1 }>(true)
	testType.equal<NotStrictArrayType<[]>, []>(true)
	testType.equal<NotStrictArrayType<Function>, Function>(true)
	testType.equal<NotStrictArrayType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotStrictArrayType<number[] | 1>, number[] | 1>(true)
})

it('returns T for intersection type', () => {
	testType.equal<NotStrictArrayType<number[] & 1>, number[] & 1>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotStrictArrayType<string[], 1, 2>, 2>(true)
	testType.equal<NotStrictArrayType<[], 1, 2>, 1>(true)

	testType.equal<NotStrictArrayType<any, 1, 2>, 1>(true)
	testType.equal<NotStrictArrayType<unknown, 1, 2>, 1>(true)
	testType.equal<NotStrictArrayType<never, 1, 2>, 1>(true)
	testType.equal<NotStrictArrayType<void, 1, 2>, 1>(true)
})

it('supports readonly array', () => {
	testType.equal<NotStrictArrayType<readonly []>, readonly []>(true)
})
