import { it } from '@jest/globals'
import { testType, type NotUndefinedType } from '../index.js'

it('returns never for undefined', () => {
	testType.never<NotUndefinedType<undefined>>(true)
})

it('returns T for special types', () => {
	testType.equal<NotUndefinedType<any>, any>(true)
	testType.equal<NotUndefinedType<unknown>, unknown>(true)
	testType.equal<NotUndefinedType<void>, void>(true)
	testType.equal<NotUndefinedType<never>, never>(true)
})

it('returns T for other types', () => {
	testType.equal<NotUndefinedType<null>, null>(true)
	testType.equal<NotUndefinedType<number>, number>(true)
	testType.equal<NotUndefinedType<boolean>, boolean>(true)
	testType.equal<NotUndefinedType<true>, true>(true)
	testType.equal<NotUndefinedType<false>, false>(true)
	testType.equal<NotUndefinedType<string>, string>(true)
	testType.equal<NotUndefinedType<''>, ''>(true)
	testType.equal<NotUndefinedType<symbol>, symbol>(true)
	testType.equal<NotUndefinedType<bigint>, bigint>(true)
	testType.equal<NotUndefinedType<{}>, {}>(true)
	testType.equal<NotUndefinedType<string[]>, string[]>(true)
	testType.equal<NotUndefinedType<[]>, []>(true)
	testType.equal<NotUndefinedType<Function>, Function>(true)
	testType.equal<NotUndefinedType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotUndefinedType<undefined | 1>, undefined | 1>(true)
})

it('returns T as undefined & any => any', () => {
	testType.equal<NotUndefinedType<undefined & any>, undefined & any>(true)
})

it('returns never as undefined & unknown => undefined', () => {
	testType.never<NotUndefinedType<undefined & unknown>>(true)
})

it('returns never as undefined & void => undefined', () => {
	testType.never<NotUndefinedType<undefined & void>>(true)
})

it('returns T as undefined & never => never', () => {
	testType.equal<NotUndefinedType<undefined & never>, undefined & never, never>(true)
})

it('returns T as undefined & <others> => never', () => {
	testType.equal<NotUndefinedType<undefined & null>, undefined & null, never>(true)
	testType.equal<NotUndefinedType<undefined & number>, undefined & number, never>(true)
	testType.equal<NotUndefinedType<undefined & 1>, undefined & 1, never>(true)
	testType.equal<NotUndefinedType<undefined & boolean>, undefined & boolean, never>(true)
	testType.equal<NotUndefinedType<undefined & true>, undefined & true, never>(true)
	testType.equal<NotUndefinedType<undefined & false>, undefined & false, never>(true)
	testType.equal<NotUndefinedType<undefined & string>, undefined & string, never>(true)
	testType.equal<NotUndefinedType<undefined & ''>, undefined & '', never>(true)
	testType.equal<NotUndefinedType<undefined & symbol>, undefined & symbol, never>(true)
	testType.equal<NotUndefinedType<undefined & bigint>, undefined & bigint, never>(true)
	testType.equal<NotUndefinedType<undefined & 1n>, undefined & 1n, never>(true)
	testType.equal<NotUndefinedType<undefined & {}>, undefined & {}, never>(true)
	testType.equal<NotUndefinedType<undefined & { a: 1 }>, undefined & { a: 1 }, never>(true)
	testType.equal<NotUndefinedType<undefined & string[]>, undefined & string[], never>(true)
	testType.equal<NotUndefinedType<undefined & []>, undefined & [], never>(true)
	testType.equal<NotUndefinedType<undefined & Function>, undefined & Function, never>(true)
	testType.equal<NotUndefinedType<undefined & (() => void)>, undefined & (() => void), never>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotUndefinedType<undefined, 1, 2>, 2>(true)
	testType.equal<NotUndefinedType<any, 1, 2>, 1>(true)
	testType.equal<NotUndefinedType<unknown, 1, 2>, 1>(true)
	testType.equal<NotUndefinedType<never, 1, 2>, 1>(true)
	testType.equal<NotUndefinedType<void, 1, 2>, 1>(true)
})
