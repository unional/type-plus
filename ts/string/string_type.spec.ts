import { type, type StringType } from '../index.js'

it('returns T if T is string', () => {
	type.equal<StringType<string>, string>(true)
})

it('returns T if T is a string literal', () => {
	type.equal<StringType<''>, ''>(true)
	type.equal<StringType<'a'>, 'a'>(true)
})

it('returns never for special types', () => {
	type.never<StringType<any>>(true)
	type.never<StringType<unknown>>(true)
	type.never<StringType<void>>(true)
	type.never<StringType<never>>(true)
})

it('returns never for other types', () => {
	type.never<StringType<undefined>>(true)
	type.never<StringType<null>>(true)
	type.never<StringType<boolean>>(true)
	type.never<StringType<true>>(true)
	type.never<StringType<false>>(true)
	type.never<StringType<number>>(true)
	type.never<StringType<1>>(true)
	type.never<StringType<symbol>>(true)
	type.never<StringType<bigint>>(true)
	type.never<StringType<{}>>(true)
	type.never<StringType<string[]>>(true)
	type.never<StringType<[]>>(true)
	type.never<StringType<Function>>(true)
	type.never<StringType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<StringType<string | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<StringType<string, 1, 2>, 1>(true)
	type.equal<StringType<'', 1, 2>, 1>(true)
	type.equal<StringType<'a', 1, 2>, 1>(true)

	type.equal<StringType<any, 1, 2>, 2>(true)
	type.equal<StringType<unknown, 1, 2>, 2>(true)
	type.equal<StringType<never, 1, 2>, 2>(true)
	type.equal<StringType<void, 1, 2>, 2>(true)
})

test('union behavior of string', () => {
	type.equal<string | undefined, string | undefined>(true)
	type.equal<string | null, string | null>(true)
	type.equal<string | boolean, string | boolean>(true)
	type.equal<string | true, string | true>(true)
	type.equal<string | false, string | false>(true)
	type.equal<string | number, string | number>(true)
	type.equal<string | 1, string | 1>(true)
	type.equal<string | string, string>(true)
	type.equal<string | '', string>(true)
	type.equal<string | symbol, string | symbol>(true)
	type.equal<string | bigint, string | bigint>(true)
	type.equal<string | 1n, string | 1n>(true)
	type.equal<string | {}, string | {}>(true)
	type.equal<string | { a: 1 }, string | { a: 1 }>(true)
	type.equal<string | string[], string | string[]>(true)
	type.equal<string | [], string | []>(true)
	type.equal<string | Function, string | Function>(true)
	type.equal<string | (() => void), string | (() => void)>(true)

	type.equal<string | any, any>(true)
	type.equal<string | unknown, unknown>(true)
	type.equal<string | never, string>(true)
	type.equal<string | void, string | void>(true)
})

test('intersection behavior of string', () => {
	type.equal<string & undefined, never>(true)
	type.equal<string & null, never>(true)

	type.equal<string & boolean, never>(true)
	type.equal<string & true, never>(true)
	type.equal<string & false, never>(true)

	type.equal<string & number, never>(true)
	type.equal<string & 1, never>(true)
	type.equal<string & string, string>(true)
	type.equal<string & '', ''>(true)
	type.equal<string & symbol, never>(true)
	type.equal<string & bigint, never>(true)
	type.equal<string & 1n, never>(true)

	type.equal<string & {}, string & {}>(true)

	type.equal<string & { a: 1 }, string & { a: 1 }>(true)
	type.equal<string & string[], string & string[]>(true)
	type.equal<string & [], string & []>(true)
	type.equal<string & Function, string & Function>(true)
	type.equal<string & (() => void), string & (() => void)>(true)

	type.equal<string & any, any>(true)
	type.equal<string & unknown, string>(true)
	type.equal<string & never, never>(true)
	type.equal<string & void, never>(true)
})
