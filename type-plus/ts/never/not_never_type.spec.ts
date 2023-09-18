import { it } from '@jest/globals'
import { testType, type $Never, type NotNeverType } from '../index.js'

it('returns `is_never` if T is never', () => {
	testType.equal<NotNeverType<never>, $Never>(true)
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

it('returns $Never for intersection type', () => {
	testType.equal<NotNeverType<never & { a: 1 }>, $Never>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotNeverType<never, { $then: 1, $else: 2 }>, 2>(true)
	testType.equal<NotNeverType<0, { $then: 1, $else: 2 }>, 1>(true)

	testType.equal<NotNeverType<any, { $then: 1, $else: 2 }>, 1>(true)
	testType.equal<NotNeverType<unknown, { $then: 1, $else: 2 }>, 1>(true)
	testType.equal<NotNeverType<void, { $then: 1, $else: 2 }>, 1>(true)
})
