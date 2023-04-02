import { testType, type TupleType } from '../index.js'

it('returns T if T is a tuple', () => {
	testType.equal<TupleType<[]>, []>(true)
	testType.equal<TupleType<[1]>, [1]>(true)
})

it('returns never if T is an array', () => {
	testType.never<TupleType<string[]>>(true)
})

it('returns never for special types', () => {
	testType.never<TupleType<void>>(true)
	testType.never<TupleType<unknown>>(true)
	testType.never<TupleType<any>>(true)
	testType.never<TupleType<never>>(true)
})

it('returns never if T for other types', () => {
	testType.never<TupleType<undefined>>(true)
	testType.never<TupleType<null>>(true)
	testType.never<TupleType<boolean>>(true)
	testType.never<TupleType<true>>(true)
	testType.never<TupleType<false>>(true)
	testType.never<TupleType<number>>(true)
	testType.never<TupleType<1>>(true)
	testType.never<TupleType<string>>(true)
	testType.never<TupleType<''>>(true)
	testType.never<TupleType<symbol>>(true)
	testType.never<TupleType<bigint>>(true)
	testType.never<TupleType<1n>>(true)
	testType.never<TupleType<{}>>(true)
	testType.never<TupleType<string[]>>(true)
	testType.never<TupleType<Function>>(true)
	testType.never<TupleType<() => void>>(true)
})

it('returns never if T is an union of tuple and other types', () => {
	testType.never<TupleType<[1] | string>>(true)
})

it('returns T if T is union of tuples', () => {
	testType.equal<TupleType<[] | [1]>, [] | [1]>(true)
})

it('returns T if T is intersection of tuples', () => {
	testType.equal<TupleType<[] & { a: 1 }>, [] & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<TupleType<[], 1, 2>, 1>(true)
	testType.equal<TupleType<string[], 1, 2>, 2>(true)

	testType.equal<TupleType<any, 1, 2>, 2>(true)
	testType.equal<TupleType<unknown, 1, 2>, 2>(true)
	testType.equal<TupleType<never, 1, 2>, 2>(true)
	testType.equal<TupleType<void, 1, 2>, 2>(true)
})

test('union behavior of tuple', () => {
	testType.equal<['a'] | undefined, ['a'] | undefined>(true)
	testType.equal<['a'] | null, ['a'] | null>(true)
	testType.equal<['a'] | boolean, ['a'] | boolean>(true)
	testType.equal<['a'] | true, ['a'] | true>(true)
	testType.equal<['a'] | false, ['a'] | false>(true)
	testType.equal<['a'] | number, ['a'] | number>(true)
	testType.equal<['a'] | 1, ['a'] | 1>(true)
	testType.equal<['a'] | string, ['a'] | string>(true)
	testType.equal<['a'] | '', ['a'] | ''>(true)
	testType.equal<['a'] | symbol, ['a'] | symbol>(true)
	testType.equal<['a'] | bigint, ['a'] | bigint>(true)
	testType.equal<['a'] | 1n, ['a'] | 1n>(true)
	testType.equal<['a'] | {}, ['a'] | {}>(true)
	testType.equal<['a'] | { a: 1 }, ['a'] | { a: 1 }>(true)
	testType.equal<['a'] | string[], ['a'] | string[]>(true)
	testType.equal<['a'] | [], ['a'] | []>(true)
	testType.equal<['a'] | Function, ['a'] | Function>(true)
	testType.equal<['a'] | (() => void), ['a'] | (() => void)>(true)

	testType.equal<['a'] | any, any>(true)
	testType.equal<['a'] | unknown, unknown>(true)
	testType.equal<['a'] | never, ['a']>(true)
	testType.equal<['a'] | void, ['a'] | void>(true)
})

test('intersection behavior of tuple', () => {
	testType.equal<['a'] & undefined, never>(true)
	testType.equal<['a'] & null, never>(true)

	testType.equal<['a'] & boolean, ['a'] & boolean>(true)
	testType.equal<['a'] & true, ['a'] & true>(true)
	testType.equal<['a'] & false, ['a'] & false>(true)
	testType.equal<['a'] & number, ['a'] & number>(true)
	testType.equal<['a'] & 1, ['a'] & 1>(true)
	testType.equal<['a'] & string, ['a'] & string>(true)
	testType.equal<['a'] & '', ['a'] & ''>(true)

	testType.equal<['a'] & symbol, symbol>(true)

	testType.equal<['a'] & bigint, ['a'] & bigint>(true)
	testType.equal<['a'] & 1n, ['a'] & 1n>(true)

	testType.equal<['a'] & {}, ['a']>(true)

	testType.equal<['a'] & { a: 1 }, ['a'] & { a: 1 }>(true)
	testType.equal<['a'] & string[], ['a'] & string[]>(true)
	testType.equal<['a'] & [], ['a'] & []>(true)
	testType.equal<['a'] & Function, ['a'] & Function>(true)
	testType.equal<['a'] & (() => void), ['a'] & (() => void)>(true)

	testType.equal<['a'] & any, any>(true)
	testType.equal<['a'] & unknown, ['a']>(true)
	testType.equal<['a'] & never, never>(true)
	testType.equal<['a'] & void, ['a'] & void>(true)
})
