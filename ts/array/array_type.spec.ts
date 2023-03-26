import { type, type ArrayType } from '../index.js'

it('returns T if T is array', () => {
	type.equal<ArrayType<string[]>, string[]>(true)
})

it('returns never if T is tuple', () => {
	type.never<ArrayType<[]>>(true)
	type.never<ArrayType<[1]>>(true)
})

it('returns never for special types', () => {
	type.never<ArrayType<void>>(true)
	type.never<ArrayType<unknown>>(true)
	type.never<ArrayType<any>>(true)
	type.never<ArrayType<never>>(true)
})
it('returns never for other types', () => {
	type.never<ArrayType<undefined>>(true)
	type.never<ArrayType<null>>(true)
	type.never<ArrayType<boolean>>(true)
	type.never<ArrayType<true>>(true)
	type.never<ArrayType<false>>(true)
	type.never<ArrayType<number>>(true)
	type.never<ArrayType<1>>(true)
	type.never<ArrayType<string>>(true)
	type.never<ArrayType<''>>(true)
	type.never<ArrayType<symbol>>(true)
	type.never<ArrayType<bigint>>(true)
	type.never<ArrayType<1n>>(true)
	type.never<ArrayType<{}>>(true)
	type.never<ArrayType<{ a: 1 }>>(true)
	type.never<ArrayType<[]>>(true)
	type.never<ArrayType<Function>>(true)
	type.never<ArrayType<() => void>>(true)
})

test('union behavior of array', () => {
	type.equal<number[] | undefined, number[] | undefined>(true)
	type.equal<number[] | null, number[] | null>(true)
	type.equal<number[] | boolean, number[] | boolean>(true)
	type.equal<number[] | true, number[] | true>(true)
	type.equal<number[] | false, number[] | false>(true)
	type.equal<number[] | number, number[] | number>(true)
	type.equal<number[] | 1, number[] | 1>(true)
	type.equal<number[] | string, number[] | string>(true)
	type.equal<number[] | '', number[] | ''>(true)
	type.equal<number[] | symbol, number[] | symbol>(true)
	type.equal<number[] | bigint, number[] | bigint>(true)
	type.equal<number[] | 1n, number[] | 1n>(true)
	type.equal<number[] | {}, number[] | {}>(true)
	type.equal<number[] | { a: 1 }, number[] | { a: 1 }>(true)
	type.equal<number[] | string[], number[] | string[]>(true)
	type.equal<number[] | [], number[] | []>(true)
	type.equal<number[] | Function, number[] | Function>(true)
	type.equal<number[] | (() => void), number[] | (() => void)>(true)

	type.equal<number[] | any, any>(true)
	type.equal<number[] | unknown, unknown>(true)
	type.equal<number[] | never, number[]>(true)
	type.equal<number[] | void, number[] | void>(true)
})

test('intersection behavior of array', () => {
	type.equal<number[] & undefined, never>(true)
	type.equal<number[] & null, never>(true)

	type.equal<number[] & boolean, number[] & boolean>(true)
	type.equal<number[] & true, number[] & true>(true)
	type.equal<number[] & false, number[] & false>(true)
	type.equal<number[] & number, number[] & number>(true)
	type.equal<number[] & 1, number[] & 1>(true)
	type.equal<number[] & string, number[] & string>(true)
	type.equal<number[] & '', number[] & ''>(true)
	type.equal<number[] & symbol, number[] & symbol>(true)
	type.equal<number[] & bigint, number[] & bigint>(true)
	type.equal<number[] & 1n, number[] & 1n>(true)

	type.equal<number[] & {}, number[]>(true)

	type.equal<number[] & { a: 1 }, number[] & { a: 1 }>(true)
	type.equal<number[] & string[], number[] & string[]>(true)
	type.equal<number[] & [], number[] & []>(true)
	type.equal<number[] & Function, number[] & Function>(true)
	type.equal<number[] & (() => void), number[] & (() => void)>(true)

	type.equal<number[] & any, any>(true)
	type.equal<number[] & unknown, number[]>(true)
	type.equal<number[] & never, never>(true)
	type.equal<number[] & void, number[] & void>(true)
})

it('returns never for union type', () => {
	type.never<ArrayType<number[] | 1>>(true)
})

it('returns T for intersection type', () => {
	type.equal<ArrayType<number[] & 1>, number[] & 1>(true)
})

it('can override Then/Else', () => {
	type.equal<ArrayType<string[], 1, 2>, 1>(true)
	type.equal<ArrayType<[], 1, 2>, 2>(true)

	type.equal<ArrayType<any, 1, 2>, 2>(true)
	type.equal<ArrayType<unknown, 1, 2>, 2>(true)
	type.equal<ArrayType<never, 1, 2>, 2>(true)
	type.equal<ArrayType<void, 1, 2>, 2>(true)
})
