import { it } from '@jest/globals'
import { testType, type Is_Never, type NotNeverType } from '../index.js'

it('returns `is_never` if T is never', () => {
	testType.equal<NotNeverType<never>, Is_Never>(true)
})

it('returns T for other special types', () => {
	testType.equal<NotNeverType<unknown>, unknown>(true)
	testType.equal<NotNeverType<void>, void>(true)
	testType.equal<NotNeverType<any>, any>(true)
})

it('returns T for other types', () => {
	testType.equal<NotNeverType<undefined>, undefined>(true)
	testType.equal<NotNeverType<null>, null>(true)
	testType.equal<NotNeverType<number>, number>(true)
	testType.equal<NotNeverType<boolean>, boolean>(true)
	testType.equal<NotNeverType<true>, true>(true)
	testType.equal<NotNeverType<false>, false>(true)
	testType.equal<NotNeverType<string>, string>(true)
	testType.equal<NotNeverType<''>, ''>(true)
	testType.equal<NotNeverType<symbol>, symbol>(true)
	testType.equal<NotNeverType<bigint>, bigint>(true)
	testType.equal<NotNeverType<{}>, {}>(true)
	testType.equal<NotNeverType<string[]>, string[]>(true)
	testType.equal<NotNeverType<[]>, []>(true)
	testType.equal<NotNeverType<Function>, Function>(true)
	testType.equal<NotNeverType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotNeverType<never | 1>, 1>(true)
})

it('returns Is_Never for intersection type', () => {
	testType.equal<NotNeverType<never & { a: 1 }>, Is_Never>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotNeverType<never, 1, 2>, 2>(true)
	testType.equal<NotNeverType<0, 1, 2>, 1>(true)

	testType.equal<NotNeverType<any, 1, 2>, 1>(true)
	testType.equal<NotNeverType<unknown, 1, 2>, 1>(true)
	testType.equal<NotNeverType<void, 1, 2>, 1>(true)
})
