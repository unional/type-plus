import { type, type NumberType } from '../index.js'

it('returns T if T is number', () => {
	type.equal<NumberType<number>, number>(true)
})

it('returns T if T is number literial', () => {
	type.equal<NumberType<-1>, -1>(true)
	type.equal<NumberType<0>, 0>(true)
	type.equal<NumberType<1>, 1>(true)
	type.equal<NumberType<1.1>, 1.1>(true)
})

it('returns never for special types', () => {
	type.never<NumberType<void>>(true)
	type.never<NumberType<unknown>>(true)
	type.never<NumberType<any>>(true)
	type.never<NumberType<never>>(true)
})

it('returns never for other types', () => {
	type.never<NumberType<undefined>>(true)
	type.never<NumberType<null>>(true)
	type.never<NumberType<boolean>>(true)
	type.never<NumberType<true>>(true)
	type.never<NumberType<false>>(true)
	type.never<NumberType<string>>(true)
	type.never<NumberType<''>>(true)
	type.never<NumberType<symbol>>(true)
	type.never<NumberType<bigint>>(true)
	type.never<NumberType<1n>>(true)
	type.never<NumberType<{}>>(true)
	type.never<NumberType<string[]>>(true)
	type.never<NumberType<[]>>(true)
	type.never<NumberType<Function>>(true)
	type.never<NumberType<() => void>>(true)
})

it('returns never if T is union of non number', () => {
	type.never<NumberType<number | string>>(true)
})

it('returns T if T is union of number and number literal', () => {
	type.equal<NumberType<number | 1>, number>(true)
})

it('can override Then/Else', () => {
	type.equal<NumberType<number, 1, 2>, 1>(true)
	type.equal<NumberType<0, 1, 2>, 1>(true)

	type.equal<NumberType<any, 1, 2>, 2>(true)
	type.equal<NumberType<unknown, 1, 2>, 2>(true)
	type.equal<NumberType<never, 1, 2>, 2>(true)
	type.equal<NumberType<void, 1, 2>, 2>(true)
})

test('union behavior of number', () => {
	type.equal<number | undefined, number | undefined>(true)
	type.equal<number | null, number | null>(true)
	type.equal<number | boolean, number | boolean>(true)
	type.equal<number | true, number | true>(true)
	type.equal<number | false, number | false>(true)
	type.equal<number | number, number>(true)
	type.equal<number | 1, number>(true)
	type.equal<number | string, number | string>(true)
	type.equal<number | '', number | ''>(true)
	type.equal<number | symbol, number | symbol>(true)
	type.equal<number | bigint, number | bigint>(true)
	type.equal<number | 1n, number | 1n>(true)
	type.equal<number | {}, number | {}>(true)
	type.equal<number | { a: 1 }, number | { a: 1 }>(true)
	type.equal<number | string[], number | string[]>(true)
	type.equal<number | [], number | []>(true)
	type.equal<number | Function, number | Function>(true)
	type.equal<number | (() => void), number | (() => void)>(true)

	type.equal<number | any, any>(true)
	type.equal<number | unknown, unknown>(true)
	type.equal<number | never, number>(true)
	type.equal<number | void, number | void>(true)
})

test('intersection behavior of number', () => {
	type.equal<number & undefined, never>(true)
	type.equal<number & null, never>(true)

	type.equal<number & boolean, never>(true)
	type.equal<number & true, never>(true)
	type.equal<number & false, never>(true)

	type.equal<number & number, number>(true)
	type.equal<number & 1, 1>(true)
	type.equal<number & string, never>(true)
	type.equal<number & '', never>(true)
	type.equal<number & symbol, never>(true)
	type.equal<number & bigint, never>(true)
	type.equal<number & 1n, never>(true)

	type.equal<number & {}, number>(true)

	type.equal<number & { a: 1 }, number & { a: 1 }>(true)
	type.equal<number & string[], number & string[]>(true)
	type.equal<number & [], number & []>(true)
	type.equal<number & Function, number & Function>(true)
	type.equal<number & (() => void), number & (() => void)>(true)

	type.equal<number & any, any>(true)
	type.equal<number & unknown, number>(true)
	type.equal<number & never, never>(true)
	type.equal<number & void, never>(true)
})
