import { it } from '@jest/globals'
import { testType, type UndefinedType } from '../index.js'

it('returns T if T is undefined', () => {
	testType.equal<UndefinedType<undefined>, undefined>(true)
})

it('returns never for special types', () => {
	testType.never<UndefinedType<any>>(true)
	testType.never<UndefinedType<unknown>>(true)
	testType.never<UndefinedType<void>>(true)
	testType.never<UndefinedType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<UndefinedType<null>>(true)
	testType.never<UndefinedType<number>>(true)
	testType.never<UndefinedType<1>>(true)
	testType.never<UndefinedType<boolean>>(true)
	testType.never<UndefinedType<true>>(true)
	testType.never<UndefinedType<false>>(true)
	testType.never<UndefinedType<string>>(true)
	testType.never<UndefinedType<''>>(true)
	testType.never<UndefinedType<symbol>>(true)
	testType.never<UndefinedType<bigint>>(true)
	testType.never<UndefinedType<1n>>(true)
	testType.never<UndefinedType<{}>>(true)
	testType.never<UndefinedType<string[]>>(true)
	testType.never<UndefinedType<[]>>(true)
	testType.never<UndefinedType<Function>>(true)
	testType.never<UndefinedType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<UndefinedType<undefined | 1>>(true)
})

it('returns never as undefined & any => any', () => {
	testType.never<UndefinedType<undefined & any>>(true)
})

it('returns undefined as undefined & unknown => undefined', () => {
	testType.equal<UndefinedType<undefined & unknown>, undefined & unknown, undefined>(true)
})

it('returns undefined as undefined & void => undefined', () => {
	testType.equal<UndefinedType<undefined & void>, undefined & void, undefined>(true)
})

it('returns never as undefined & never => never', () => {
	testType.equal<UndefinedType<undefined & never>, undefined & never, never>(true)
})

it('returns never as undefined & <others> => never', () => {
	testType.equal<UndefinedType<undefined & null>, undefined & null, never>(true)
	testType.equal<UndefinedType<undefined & number>, undefined & number, never>(true)
	testType.equal<UndefinedType<undefined & 1>, undefined & 1, never>(true)
	testType.equal<UndefinedType<undefined & boolean>, undefined & boolean, never>(true)
	testType.equal<UndefinedType<undefined & true>, undefined & true, never>(true)
	testType.equal<UndefinedType<undefined & false>, undefined & false, never>(true)
	testType.equal<UndefinedType<undefined & string>, undefined & string, never>(true)
	testType.equal<UndefinedType<undefined & ''>, undefined & '', never>(true)
	testType.equal<UndefinedType<undefined & symbol>, undefined & symbol, never>(true)
	testType.equal<UndefinedType<undefined & bigint>, undefined & bigint, never>(true)
	testType.equal<UndefinedType<undefined & 1n>, undefined & 1n, never>(true)
	testType.equal<UndefinedType<undefined & {}>, undefined & {}, never>(true)
	testType.equal<UndefinedType<undefined & { a: 1 }>, undefined & { a: 1 }, never>(true)
	testType.equal<UndefinedType<undefined & string[]>, undefined & string[], never>(true)
	testType.equal<UndefinedType<undefined & []>, undefined & [], never>(true)
	testType.equal<UndefinedType<undefined & Function>, undefined & Function, never>(true)
	testType.equal<UndefinedType<undefined & (() => void)>, undefined & (() => void), never>(true)
})

it('can override Then/Else', () => {
	testType.equal<UndefinedType<undefined, 1, 2>, 1>(true)
	testType.equal<UndefinedType<0, 1, 2>, 2>(true)

	testType.equal<UndefinedType<any, 1, 2>, 2>(true)
	testType.equal<UndefinedType<unknown, 1, 2>, 2>(true)
	testType.equal<UndefinedType<never, 1, 2>, 2>(true)
	testType.equal<UndefinedType<void, 1, 2>, 2>(true)
})
