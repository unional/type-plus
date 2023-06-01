import { it } from '@jest/globals'
import { testType, type NotTrueType } from '../index.js'

it('returns never it T is true', () => {
	testType.never<NotTrueType<true>>(true)
})

it('returns T if T is boolean or false', () => {
	testType.equal<NotTrueType<boolean>, boolean>(true)
	testType.equal<NotTrueType<false>, false>(true)
})

it('returns T for special types', () => {
	testType.equal<NotTrueType<void>, void>(true)
	testType.equal<NotTrueType<unknown>, unknown>(true)
	testType.equal<NotTrueType<any>, any>(true)
	testType.equal<NotTrueType<never>, never>(true)
})

it('returns T for other types', () => {
	testType.equal<NotTrueType<undefined>, undefined>(true)
	testType.equal<NotTrueType<null>, null>(true)
	testType.equal<NotTrueType<number>, number>(true)
	testType.equal<NotTrueType<boolean>, boolean>(true)
	testType.equal<NotTrueType<false>, false>(true)
	testType.equal<NotTrueType<string>, string>(true)
	testType.equal<NotTrueType<''>, ''>(true)
	testType.equal<NotTrueType<symbol>, symbol>(true)
	testType.equal<NotTrueType<bigint>, bigint>(true)
	testType.equal<NotTrueType<1n>, 1n>(true)
	testType.equal<NotTrueType<{}>, {}>(true)
	testType.equal<NotTrueType<{ a: 1 }>, { a: 1 }>(true)
	testType.equal<NotTrueType<string[]>, string[]>(true)
	testType.equal<NotTrueType<[]>, []>(true)
	testType.equal<NotTrueType<Function>, Function>(true)
	testType.equal<NotTrueType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotTrueType<true | 1>, true | 1>(true)
	testType.equal<NotTrueType<true | boolean>, boolean>(true)
})

it('returns T for intersection type', () => {
	testType.equal<NotTrueType<true & { a: 1 }>, true & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotTrueType<true, 1, 2>, 2>(true)
	testType.equal<NotTrueType<0, 1, 2>, 1>(true)

	testType.equal<NotTrueType<any, 1, 2>, 1>(true)
	testType.equal<NotTrueType<unknown, 1, 2>, 1>(true)
	testType.equal<NotTrueType<never, 1, 2>, 1>(true)
	testType.equal<NotTrueType<void, 1, 2>, 1>(true)
})
