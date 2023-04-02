import { testType, type NumberType } from '../index.js'

it('returns T if T is number', () => {
	testType.equal<NumberType<number>, number>(true)
})

it('returns T if T is number literial', () => {
	testType.equal<NumberType<-1>, -1>(true)
	testType.equal<NumberType<0>, 0>(true)
	testType.equal<NumberType<1>, 1>(true)
	testType.equal<NumberType<1.1>, 1.1>(true)
})

it('returns never for special types', () => {
	testType.never<NumberType<void>>(true)
	testType.never<NumberType<unknown>>(true)
	testType.never<NumberType<any>>(true)
	testType.never<NumberType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<NumberType<undefined>>(true)
	testType.never<NumberType<null>>(true)
	testType.never<NumberType<boolean>>(true)
	testType.never<NumberType<true>>(true)
	testType.never<NumberType<false>>(true)
	testType.never<NumberType<string>>(true)
	testType.never<NumberType<''>>(true)
	testType.never<NumberType<symbol>>(true)
	testType.never<NumberType<bigint>>(true)
	testType.never<NumberType<1n>>(true)
	testType.never<NumberType<{}>>(true)
	testType.never<NumberType<string[]>>(true)
	testType.never<NumberType<[]>>(true)
	testType.never<NumberType<Function>>(true)
	testType.never<NumberType<() => void>>(true)
})

it('returns never if T is union of non number', () => {
	testType.never<NumberType<number | string>>(true)
})

it('returns T if T is union of number and number literal', () => {
	testType.equal<NumberType<number | 1>, number>(true)
})

it('returns T if T is intersection of number', () => {
	testType.equal<NumberType<number & { a: 1 }>, number & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<NumberType<number, 1, 2>, 1>(true)
	testType.equal<NumberType<0, 1, 2>, 1>(true)

	testType.equal<NumberType<any, 1, 2>, 2>(true)
	testType.equal<NumberType<unknown, 1, 2>, 2>(true)
	testType.equal<NumberType<never, 1, 2>, 2>(true)
	testType.equal<NumberType<void, 1, 2>, 2>(true)
})

test('union behavior of number', () => {
	testType.equal<number | undefined, number | undefined>(true)
	testType.equal<number | null, number | null>(true)
	testType.equal<number | boolean, number | boolean>(true)
	testType.equal<number | true, number | true>(true)
	testType.equal<number | false, number | false>(true)
	testType.equal<number | number, number>(true)
	testType.equal<number | 1, number>(true)
	testType.equal<number | string, number | string>(true)
	testType.equal<number | '', number | ''>(true)
	testType.equal<number | symbol, number | symbol>(true)
	testType.equal<number | bigint, number | bigint>(true)
	testType.equal<number | 1n, number | 1n>(true)
	testType.equal<number | {}, number | {}>(true)
	testType.equal<number | { a: 1 }, number | { a: 1 }>(true)
	testType.equal<number | string[], number | string[]>(true)
	testType.equal<number | [], number | []>(true)
	testType.equal<number | Function, number | Function>(true)
	testType.equal<number | (() => void), number | (() => void)>(true)

	testType.equal<number | any, any>(true)
	testType.equal<number | unknown, unknown>(true)
	testType.equal<number | never, number>(true)
	testType.equal<number | void, number | void>(true)
})

test('intersection behavior of number', () => {
	testType.equal<number & undefined, never>(true)
	testType.equal<number & null, never>(true)

	testType.equal<number & boolean, never>(true)
	testType.equal<number & true, never>(true)
	testType.equal<number & false, never>(true)

	testType.equal<number & number, number>(true)
	testType.equal<number & 1, 1>(true)
	testType.equal<number & string, never>(true)
	testType.equal<number & '', never>(true)
	testType.equal<number & symbol, never>(true)
	testType.equal<number & bigint, never>(true)
	testType.equal<number & 1n, never>(true)

	testType.equal<number & {}, number>(true)

	testType.equal<number & { a: 1 }, number & { a: 1 }>(true)
	testType.equal<number & string[], number & string[]>(true)
	testType.equal<number & [], number & []>(true)
	testType.equal<number & Function, number & Function>(true)
	testType.equal<number & (() => void), number & (() => void)>(true)

	testType.equal<number & any, any>(true)
	testType.equal<number & unknown, number>(true)
	testType.equal<number & never, never>(true)
	testType.equal<number & void, never>(true)
})
