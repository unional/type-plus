import { it } from '@jest/globals'
import { testType, type NotArrayType } from '../index.js'

it('returns never if T is array', () => {
	testType.never<NotArrayType<string[]>>(true)
})

it('returns T if T is tuple', () => {
	testType.equal<NotArrayType<[]>, []>(true)
	testType.equal<NotArrayType<[1]>, [1]>(true)
})

it('returns T for special types', () => {
	testType.equal<NotArrayType<void>, void>(true)
	testType.equal<NotArrayType<unknown>, unknown>(true)
	testType.equal<NotArrayType<any>, any>(true)
	testType.equal<NotArrayType<never>, never>(true)
})
it('returns T for other types', () => {
	testType.equal<NotArrayType<undefined>, undefined>(true)
	testType.equal<NotArrayType<null>, null>(true)
	testType.equal<NotArrayType<boolean>, boolean>(true)
	testType.equal<NotArrayType<true>, true>(true)
	testType.equal<NotArrayType<false>, false>(true)
	testType.equal<NotArrayType<number>, number>(true)
	testType.equal<NotArrayType<1>, 1>(true)
	testType.equal<NotArrayType<string>, string>(true)
	testType.equal<NotArrayType<''>, ''>(true)
	testType.equal<NotArrayType<symbol>, symbol>(true)
	testType.equal<NotArrayType<bigint>, bigint>(true)
	testType.equal<NotArrayType<1n>, 1n>(true)
	testType.equal<NotArrayType<{}>, {}>(true)
	testType.equal<NotArrayType<{ a: 1 }>, { a: 1 }>(true)
	testType.equal<NotArrayType<[]>, []>(true)
	testType.equal<NotArrayType<Function>, Function>(true)
	testType.equal<NotArrayType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotArrayType<number[] | 1>, number[] | 1>(true)
})

it('returns T for intersection type', () => {
	testType.equal<NotArrayType<number[] & 1>, number[] & 1>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotArrayType<string[], 1, 2>, 2>(true)
	testType.equal<NotArrayType<[], 1, 2>, 1>(true)

	testType.equal<NotArrayType<any, 1, 2>, 1>(true)
	testType.equal<NotArrayType<unknown, 1, 2>, 1>(true)
	testType.equal<NotArrayType<never, 1, 2>, 1>(true)
	testType.equal<NotArrayType<void, 1, 2>, 1>(true)
})

it('supports readonly array', () => {
	testType.equal<NotArrayType<readonly []>, readonly []>(true)
})
