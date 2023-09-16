import { it } from '@jest/globals'
import { testType, type NotAnyType } from '../index.js'

it('returns never for any', () => {
	testType.never<NotAnyType<any>>(true)
})

it('returns T for other special types', () => {
	testType.equal<NotAnyType<unknown>, unknown>(true)
	testType.equal<NotAnyType<void>, void>(true)
	testType.equal<NotAnyType<never>, never>(true)
})

it('returns T for other types', () => {
	testType.equal<NotAnyType<undefined>, undefined>(true)
	testType.equal<NotAnyType<null>, null>(true)
	testType.equal<NotAnyType<boolean>, boolean>(true)
	testType.equal<NotAnyType<true>, true>(true)
	testType.equal<NotAnyType<false>, false>(true)
	testType.equal<NotAnyType<number>, number>(true)
	testType.equal<NotAnyType<1>, 1>(true)
	testType.equal<NotAnyType<string>, string>(true)
	testType.equal<NotAnyType<''>, ''>(true)
	testType.equal<NotAnyType<symbol>, symbol>(true)
	testType.equal<NotAnyType<bigint>, bigint>(true)
	testType.equal<NotAnyType<1n>, 1n>(true)
	testType.equal<NotAnyType<{}>, {}>(true)
	testType.equal<NotAnyType<{ a: 1 }>, { a: 1 }>(true)
	testType.equal<NotAnyType<string[]>, string[]>(true)
	testType.equal<NotAnyType<[]>, []>(true)
	testType.equal<NotAnyType<Function>, Function>(true)
	testType.equal<NotAnyType<() => void>, () => void>(true)
})

it('returns never for union type', () => {
	testType.equal<NotAnyType<any | 1>, never>(true)
})

it('returns never for intersection type', () => {
	testType.equal<NotAnyType<any & 1>, never>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotAnyType<any, 1, 2>, 2>(true)
	testType.equal<NotAnyType<0, 1, 2>, 1>(true)

	testType.equal<NotAnyType<never, 1, 2>, 1>(true)
	testType.equal<NotAnyType<unknown, 1, 2>, 1>(true)
	testType.equal<NotAnyType<void, 1, 2>, 1>(true)
})
