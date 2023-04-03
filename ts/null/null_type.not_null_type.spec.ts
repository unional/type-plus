import { it } from '@jest/globals'
import { testType, type NotNullType } from '../index.js'

it('returns never if T is null', () => {
	testType.never<NotNullType<null>>(true)
})

it('returns T for special types', () => {
	testType.equal<NotNullType<any>, any>(true)
	testType.equal<NotNullType<unknown>, unknown>(true)
	testType.equal<NotNullType<void>, void>(true)
	testType.equal<NotNullType<never>, never>(true)
})

it('returns T for other types', () => {
	testType.equal<NotNullType<undefined>, undefined>(true)
	testType.equal<NotNullType<boolean>, boolean>(true)
	testType.equal<NotNullType<true>, true>(true)
	testType.equal<NotNullType<false>, false>(true)
	testType.equal<NotNullType<number>, number>(true)
	testType.equal<NotNullType<1>, 1>(true)
	testType.equal<NotNullType<string>, string>(true)
	testType.equal<NotNullType<''>, ''>(true)
	testType.equal<NotNullType<symbol>, symbol>(true)
	testType.equal<NotNullType<bigint>, bigint>(true)
	testType.equal<NotNullType<{}>, {}>(true)
	testType.equal<NotNullType<string[]>, string[]>(true)
	testType.equal<NotNullType<[]>, []>(true)
	testType.equal<NotNullType<Function>, Function>(true)
	testType.equal<NotNullType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotNullType<null | 1>, null | 1>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotNullType<null, 1, 2>, 2>(true)

	testType.equal<NotNullType<any, 1, 2>, 1>(true)
	testType.equal<NotNullType<unknown, 1, 2>, 1>(true)
	testType.equal<NotNullType<never, 1, 2>, 1>(true)
	testType.equal<NotNullType<void, 1, 2>, 1>(true)
})
