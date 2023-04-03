import { it } from '@jest/globals'
import { testType, type NotVoidType } from '../index.js'

it('returns never for void', () => {
	testType.never<NotVoidType<void>>(true)
})

it('returns never for other special types', () => {
	testType.equal<NotVoidType<any>, any>(true)
	testType.equal<NotVoidType<unknown>, unknown>(true)
	testType.equal<NotVoidType<never>, never>(true)
})

it('returns never for singular types', () => {
	testType.equal<NotVoidType<undefined>, undefined>(true)
	testType.equal<NotVoidType<null>, null>(true)
	testType.equal<NotVoidType<number>, number>(true)
	testType.equal<NotVoidType<boolean>, boolean>(true)
	testType.equal<NotVoidType<true>, true>(true)
	testType.equal<NotVoidType<false>, false>(true)
	testType.equal<NotVoidType<string>, string>(true)
	testType.equal<NotVoidType<''>, ''>(true)
	testType.equal<NotVoidType<symbol>, symbol>(true)
	testType.equal<NotVoidType<bigint>, bigint>(true)
	testType.equal<NotVoidType<{}>, {}>(true)
	testType.equal<NotVoidType<string[]>, string[]>(true)
	testType.equal<NotVoidType<[]>, []>(true)
	testType.equal<NotVoidType<Function>, Function>(true)
	testType.equal<NotVoidType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotVoidType<void | 1>, void | 1>(true)
})

it('returns never for intersection type', () => {
	testType.never<NotVoidType<void & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotVoidType<void, 1, 2>, 2>(true)
	testType.equal<NotVoidType<0, 1, 2>, 1>(true)

	testType.equal<NotVoidType<any, 1, 2>, 1>(true)
	testType.equal<NotVoidType<unknown, 1, 2>, 1>(true)
	testType.equal<NotVoidType<never, 1, 2>, 1>(true)
})
