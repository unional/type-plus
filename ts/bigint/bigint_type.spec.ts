import { type, type BigintType } from '../index.js'

it('returns T if T is bigint', () => {
	type.equal<BigintType<bigint>, bigint>(true)
})

it('returns never if T is bigint literals', () => {
	type.never<BigintType<0n>>(true)
	type.never<BigintType<11111111111111111111111111111111n>>(true)
})

it('returns never for special types', () => {
	type.never<BigintType<any>>(true)
	type.never<BigintType<unknown>>(true)
	type.never<BigintType<void>>(true)
	type.never<BigintType<never>>(true)
})

test('returns never for other types', () => {
	type.never<BigintType<undefined>>(true)
	type.never<BigintType<null>>(true)
	type.never<BigintType<boolean>>(true)
	type.never<BigintType<true>>(true)
	type.never<BigintType<false>>(true)
	type.never<BigintType<number>>(true)
	type.never<BigintType<1>>(true)
	type.never<BigintType<string>>(true)
	type.never<BigintType<''>>(true)
	type.never<BigintType<symbol>>(true)
	type.never<BigintType<{}>>(true)
	type.never<BigintType<string[]>>(true)
	type.never<BigintType<[]>>(true)
	type.never<BigintType<Function>>(true)
	type.never<BigintType<() => void>>(true)
})

test('union behavior of bigint', () => {
	type.equal<bigint | undefined, bigint | undefined>(true)
	type.equal<bigint | null, bigint | null>(true)
	type.equal<bigint | boolean, bigint | boolean>(true)
	type.equal<bigint | true, bigint | true>(true)
	type.equal<bigint | false, bigint | false>(true)
	type.equal<bigint | number, bigint | number>(true)
	type.equal<bigint | 1, bigint | 1>(true)
	type.equal<bigint | string, bigint | string>(true)
	type.equal<bigint | '', bigint | ''>(true)
	type.equal<bigint | symbol, bigint | symbol>(true)

	type.equal<bigint | 1n, bigint>(true)

	type.equal<bigint | {}, bigint | {}>(true)
	type.equal<bigint | { a: 1 }, bigint | { a: 1 }>(true)
	type.equal<bigint | string[], bigint | string[]>(true)
	type.equal<bigint | [], bigint | []>(true)
	type.equal<bigint | Function, bigint | Function>(true)
	type.equal<bigint | (() => void), bigint | (() => void)>(true)

	type.equal<bigint | any, any>(true)
	type.equal<bigint | unknown, unknown>(true)
	type.equal<bigint | never, bigint>(true)
	type.equal<bigint | void, bigint | void>(true)
})

test('intersection behavior of bigint', () => {
	type.equal<bigint & undefined, never>(true)
	type.equal<bigint & null, never>(true)
	type.equal<bigint & boolean, never>(true)
	type.equal<bigint & true, never>(true)
	type.equal<bigint & false, never>(true)
	type.equal<bigint & number, never>(true)

	type.equal<bigint & 1, never>(true)

	type.equal<bigint & string, never>(true)
	type.equal<bigint & '', never>(true)
	type.equal<bigint & symbol, never>(true)

	type.equal<bigint & bigint, bigint>(true)
	type.equal<bigint & 1n, 1n>(true)

	type.equal<bigint & {}, bigint & {}>(true)
	type.equal<bigint & { a: 1 }, bigint & { a: 1 }>(true)
	type.equal<bigint & string[], bigint & string[]>(true)
	type.equal<bigint & [], bigint & []>(true)
	type.equal<bigint & Function, bigint & Function>(true)
	type.equal<bigint & (() => void), bigint & (() => void)>(true)

	type.equal<bigint & any, any>(true)
	type.equal<bigint & unknown, bigint>(true)
	type.equal<bigint & never, never>(true)
	type.equal<bigint & void, never>(true)
})

it('returns never for union type', () => {
	type.never<BigintType<bigint | 1>>(true)
	type.never<BigintType<bigint | 'a'>>(true)
})

it('returns never for intersection type', () => {
	type.never<BigintType<bigint & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<BigintType<bigint, 1, 2>, 1>(true)
	type.equal<BigintType<1n, 1, 2>, 2>(true)

	type.equal<BigintType<any, 1, 2>, 2>(true)
	type.equal<BigintType<unknown, 1, 2>, 2>(true)
	type.equal<BigintType<never, 1, 2>, 2>(true)
	type.equal<BigintType<void, 1, 2>, 2>(true)
})
