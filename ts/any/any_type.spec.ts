import { type, type AnyType } from '../index.js'

it('returns any for any', () => {
	type.equal<AnyType<any>, any>(true)
})

it('returns never for other special types', () => {
	type.never<AnyType<unknown>>(true)
	type.never<AnyType<void>>(true)
	type.never<AnyType<never>>(true)
})

it('returns never for other types', () => {
	type.never<AnyType<undefined>>(true)
	type.never<AnyType<null>>(true)
	type.never<AnyType<boolean>>(true)
	type.never<AnyType<true>>(true)
	type.never<AnyType<false>>(true)
	type.never<AnyType<number>>(true)
	type.never<AnyType<1>>(true)
	type.never<AnyType<string>>(true)
	type.never<AnyType<''>>(true)
	type.never<AnyType<symbol>>(true)
	type.never<AnyType<bigint>>(true)
	type.never<AnyType<1n>>(true)
	type.never<AnyType<{}>>(true)
	type.never<AnyType<{ a: 1 }>>(true)
	type.never<AnyType<string[]>>(true)
	type.never<AnyType<[]>>(true)
	type.never<AnyType<Function>>(true)
	type.never<AnyType<() => void>>(true)
})

test('union behavior of any', () => {
	type.equal<any | null, any>(true)
	type.equal<any | boolean, any>(true)
	type.equal<any | true, any>(true)
	type.equal<any | false, any>(true)
	type.equal<any | number, any>(true)
	type.equal<any | 1, any>(true)
	type.equal<any | string, any>(true)
	type.equal<any | '', any>(true)
	type.equal<any | symbol, any>(true)
	type.equal<any | bigint, any>(true)
	type.equal<any | 1n, any>(true)
	type.equal<any | {}, any>(true)
	type.equal<any | { a: 1 }, any>(true)
	type.equal<any | string[], any>(true)
	type.equal<any | [], any>(true)
	type.equal<any | Function, any>(true)
	type.equal<any | (() => void), any>(true)

	type.equal<any | any, any>(true)
	type.equal<any | unknown, any>(true)
	type.equal<any | never, any>(true)
	type.equal<any | void, any>(true)
})

test('intersection behavior of any', () => {
	type.equal<any & null, any>(true)
	type.equal<any & boolean, any>(true)
	type.equal<any & true, any>(true)
	type.equal<any & false, any>(true)
	type.equal<any & number, any>(true)
	type.equal<any & 1, any>(true)
	type.equal<any & string, any>(true)
	type.equal<any & '', any>(true)
	type.equal<any & symbol, any>(true)
	type.equal<any & bigint, any>(true)
	type.equal<any & 1n, any>(true)
	type.equal<any & {}, any>(true)
	type.equal<any & { a: 1 }, any>(true)
	type.equal<any & string[], any>(true)
	type.equal<any & [], any>(true)
	type.equal<any & Function, any>(true)
	type.equal<any & (() => void), any>(true)

	type.equal<any & any, any>(true)
	type.equal<any & unknown, any>(true)
	type.equal<any & never, never>(true)
	type.equal<any & void, any>(true)
})

it('returns any for union type', () => {
	type.any<AnyType<any | 1>>(true)
})

it('returns any for intersection type', () => {
	type.any<AnyType<any & 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<AnyType<any, 1, 2>, 1>(true)
	type.equal<AnyType<0, 1, 2>, 2>(true)

	type.equal<AnyType<never, 1, 2>, 2>(true)
	type.equal<AnyType<unknown, 1, 2>, 2>(true)
	type.equal<AnyType<void, 1, 2>, 2>(true)
})
