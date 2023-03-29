import { type, type TupleType } from '../index.js'

it('returns T if T is a tuple', () => {
	type.equal<TupleType<[]>, []>(true)
	type.equal<TupleType<[1]>, [1]>(true)
})

it('returns never if T is an array', () => {
	type.never<TupleType<string[]>>(true)
})

it('returns never for special types', () => {
	type.never<TupleType<void>>(true)
	type.never<TupleType<unknown>>(true)
	type.never<TupleType<any>>(true)
	type.never<TupleType<never>>(true)
})

it('returns never if T for other types', () => {
	type.never<TupleType<undefined>>(true)
	type.never<TupleType<null>>(true)
	type.never<TupleType<boolean>>(true)
	type.never<TupleType<true>>(true)
	type.never<TupleType<false>>(true)
	type.never<TupleType<number>>(true)
	type.never<TupleType<1>>(true)
	type.never<TupleType<string>>(true)
	type.never<TupleType<''>>(true)
	type.never<TupleType<symbol>>(true)
	type.never<TupleType<bigint>>(true)
	type.never<TupleType<1n>>(true)
	type.never<TupleType<{}>>(true)
	type.never<TupleType<string[]>>(true)
	type.never<TupleType<Function>>(true)
	type.never<TupleType<() => void>>(true)
})

it('returns never if T is an union of tuple and other types', () => {
	type.never<TupleType<[1] | string>>(true)
})

it('returns T if T is union of tuples', () => {
	type.equal<TupleType<[] | [1]>, [] | [1]>(true)
})

it('returns T if T is intersection of tuples', () => {
	type.equal<TupleType<[] & { a: 1 }>, [] & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	type.equal<TupleType<[], 1, 2>, 1>(true)
	type.equal<TupleType<string[], 1, 2>, 2>(true)

	type.equal<TupleType<any, 1, 2>, 2>(true)
	type.equal<TupleType<unknown, 1, 2>, 2>(true)
	type.equal<TupleType<never, 1, 2>, 2>(true)
	type.equal<TupleType<void, 1, 2>, 2>(true)
})

test('union behavior of tuple', () => {
	type.equal<['a'] | undefined, ['a'] | undefined>(true)
	type.equal<['a'] | null, ['a'] | null>(true)
	type.equal<['a'] | boolean, ['a'] | boolean>(true)
	type.equal<['a'] | true, ['a'] | true>(true)
	type.equal<['a'] | false, ['a'] | false>(true)
	type.equal<['a'] | number, ['a'] | number>(true)
	type.equal<['a'] | 1, ['a'] | 1>(true)
	type.equal<['a'] | string, ['a'] | string>(true)
	type.equal<['a'] | '', ['a'] | ''>(true)
	type.equal<['a'] | symbol, ['a'] | symbol>(true)
	type.equal<['a'] | bigint, ['a'] | bigint>(true)
	type.equal<['a'] | 1n, ['a'] | 1n>(true)
	type.equal<['a'] | {}, ['a'] | {}>(true)
	type.equal<['a'] | { a: 1 }, ['a'] | { a: 1 }>(true)
	type.equal<['a'] | string[], ['a'] | string[]>(true)
	type.equal<['a'] | [], ['a'] | []>(true)
	type.equal<['a'] | Function, ['a'] | Function>(true)
	type.equal<['a'] | (() => void), ['a'] | (() => void)>(true)

	type.equal<['a'] | any, any>(true)
	type.equal<['a'] | unknown, unknown>(true)
	type.equal<['a'] | never, ['a']>(true)
	type.equal<['a'] | void, ['a'] | void>(true)
})

test('intersection behavior of tuple', () => {
	type.equal<['a'] & undefined, never>(true)
	type.equal<['a'] & null, never>(true)

	type.equal<['a'] & boolean, ['a'] & boolean>(true)
	type.equal<['a'] & true, ['a'] & true>(true)
	type.equal<['a'] & false, ['a'] & false>(true)
	type.equal<['a'] & number, ['a'] & number>(true)
	type.equal<['a'] & 1, ['a'] & 1>(true)
	type.equal<['a'] & string, ['a'] & string>(true)
	type.equal<['a'] & '', ['a'] & ''>(true)

	type.equal<['a'] & symbol, symbol>(true)

	type.equal<['a'] & bigint, ['a'] & bigint>(true)
	type.equal<['a'] & 1n, ['a'] & 1n>(true)

	type.equal<['a'] & {}, ['a']>(true)

	type.equal<['a'] & { a: 1 }, ['a'] & { a: 1 }>(true)
	type.equal<['a'] & string[], ['a'] & string[]>(true)
	type.equal<['a'] & [], ['a'] & []>(true)
	type.equal<['a'] & Function, ['a'] & Function>(true)
	type.equal<['a'] & (() => void), ['a'] & (() => void)>(true)

	type.equal<['a'] & any, any>(true)
	type.equal<['a'] & unknown, ['a']>(true)
	type.equal<['a'] & never, never>(true)
	type.equal<['a'] & void, ['a'] & void>(true)
})
