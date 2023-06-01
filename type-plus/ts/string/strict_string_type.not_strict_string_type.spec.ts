import { it } from '@jest/globals'
import { testType, type NotStrictStringType } from '../index.js'

it('returns never if T is string', () => {
	testType.never<NotStrictStringType<string>>(true)
})

it('returns T if T is a string literal', () => {
	testType.equal<NotStrictStringType<''>, ''>(true)
	testType.equal<NotStrictStringType<'a'>, 'a'>(true)
})

it('returns T for special types', () => {
	testType.equal<NotStrictStringType<any>, any>(true)
	testType.equal<NotStrictStringType<unknown>, unknown>(true)
	testType.equal<NotStrictStringType<void>, void>(true)
	testType.equal<NotStrictStringType<never>, never>(true)
})

it('returns T for other types', () => {
	testType.equal<NotStrictStringType<undefined>, undefined>(true)
	testType.equal<NotStrictStringType<null>, null>(true)
	testType.equal<NotStrictStringType<boolean>, boolean>(true)
	testType.equal<NotStrictStringType<true>, true>(true)
	testType.equal<NotStrictStringType<false>, false>(true)
	testType.equal<NotStrictStringType<number>, number>(true)
	testType.equal<NotStrictStringType<1>, 1>(true)
	testType.equal<NotStrictStringType<symbol>, symbol>(true)
	testType.equal<NotStrictStringType<bigint>, bigint>(true)
	testType.equal<NotStrictStringType<{}>, {}>(true)
	testType.equal<NotStrictStringType<string[]>, string[]>(true)
	testType.equal<NotStrictStringType<[]>, []>(true)
	testType.equal<NotStrictStringType<Function>, Function>(true)
	testType.equal<NotStrictStringType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotStrictStringType<string | 1>, string | 1>(true)
})

it('returns T for intersection type', () => {
	testType.equal<NotStrictStringType<string & { a: 1 }>, string & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotStrictStringType<string, 1, 2>, 2>(true)
	testType.equal<NotStrictStringType<'', 1, 2>, 1>(true)
	testType.equal<NotStrictStringType<'a', 1, 2>, 1>(true)

	testType.equal<NotStrictStringType<any, 1, 2>, 1>(true)
	testType.equal<NotStrictStringType<unknown, 1, 2>, 1>(true)
	testType.equal<NotStrictStringType<never, 1, 2>, 1>(true)
	testType.equal<NotStrictStringType<void, 1, 2>, 1>(true)
})
