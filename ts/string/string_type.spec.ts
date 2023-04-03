import { it, test } from '@jest/globals'
import { testType, type StringType } from '../index.js'

it('returns T if T is string', () => {
	testType.equal<StringType<string>, string>(true)
})

it('returns T if T is a string literal', () => {
	testType.equal<StringType<''>, ''>(true)
	testType.equal<StringType<'a'>, 'a'>(true)
})

it('returns never for special types', () => {
	testType.never<StringType<any>>(true)
	testType.never<StringType<unknown>>(true)
	testType.never<StringType<void>>(true)
	testType.never<StringType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<StringType<undefined>>(true)
	testType.never<StringType<null>>(true)
	testType.never<StringType<boolean>>(true)
	testType.never<StringType<true>>(true)
	testType.never<StringType<false>>(true)
	testType.never<StringType<number>>(true)
	testType.never<StringType<1>>(true)
	testType.never<StringType<symbol>>(true)
	testType.never<StringType<bigint>>(true)
	testType.never<StringType<{}>>(true)
	testType.never<StringType<string[]>>(true)
	testType.never<StringType<[]>>(true)
	testType.never<StringType<Function>>(true)
	testType.never<StringType<() => void>>(true)
})

it('returns never for union type', () => {
	testType.never<StringType<string | 1>>(true)
})

it('returns T for intersection type', () => {
	testType.equal<StringType<string & { a: 1 }>, string & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<StringType<string, 1, 2>, 1>(true)
	testType.equal<StringType<'', 1, 2>, 1>(true)
	testType.equal<StringType<'a', 1, 2>, 1>(true)

	testType.equal<StringType<any, 1, 2>, 2>(true)
	testType.equal<StringType<unknown, 1, 2>, 2>(true)
	testType.equal<StringType<never, 1, 2>, 2>(true)
	testType.equal<StringType<void, 1, 2>, 2>(true)
})

test('union behavior of string', () => {
	testType.equal<string | undefined, string | undefined>(true)
	testType.equal<string | null, string | null>(true)
	testType.equal<string | boolean, string | boolean>(true)
	testType.equal<string | true, string | true>(true)
	testType.equal<string | false, string | false>(true)
	testType.equal<string | number, string | number>(true)
	testType.equal<string | 1, string | 1>(true)
	testType.equal<string | string, string>(true)
	testType.equal<string | '', string>(true)
	testType.equal<string | symbol, string | symbol>(true)
	testType.equal<string | bigint, string | bigint>(true)
	testType.equal<string | 1n, string | 1n>(true)
	testType.equal<string | {}, string | {}>(true)
	testType.equal<string | { a: 1 }, string | { a: 1 }>(true)
	testType.equal<string | string[], string | string[]>(true)
	testType.equal<string | [], string | []>(true)
	testType.equal<string | Function, string | Function>(true)
	testType.equal<string | (() => void), string | (() => void)>(true)

	testType.equal<string | any, any>(true)
	testType.equal<string | unknown, unknown>(true)
	testType.equal<string | never, string>(true)
	testType.equal<string | void, string | void>(true)
})

test('intersection behavior of string', () => {
	testType.equal<string & undefined, never>(true)
	testType.equal<string & null, never>(true)

	testType.equal<string & boolean, never>(true)
	testType.equal<string & true, never>(true)
	testType.equal<string & false, never>(true)

	testType.equal<string & number, never>(true)
	testType.equal<string & 1, never>(true)
	testType.equal<string & string, string>(true)
	testType.equal<string & '', ''>(true)
	testType.equal<string & symbol, never>(true)
	testType.equal<string & bigint, never>(true)
	testType.equal<string & 1n, never>(true)

	testType.equal<string & {}, string & {}>(true)

	testType.equal<string & { a: 1 }, string & { a: 1 }>(true)
	testType.equal<string & string[], string & string[]>(true)
	testType.equal<string & [], string & []>(true)
	testType.equal<string & Function, string & Function>(true)
	testType.equal<string & (() => void), string & (() => void)>(true)

	testType.equal<string & any, any>(true)
	testType.equal<string & unknown, string>(true)
	testType.equal<string & never, never>(true)
	testType.equal<string & void, never>(true)
})
