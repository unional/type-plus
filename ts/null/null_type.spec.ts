import { type, type NullType } from '../index.js'

it('returns T if T is null', () => {
	type.equal<NullType<null>, null>(true)
})

it('returns never for special types', () => {
	type.never<NullType<any>>(true)
	type.never<NullType<unknown>>(true)
	type.never<NullType<void>>(true)
	type.never<NullType<never>>(true)
})

test('returns never for other types', () => {
	type.never<NullType<undefined>>(true)
	type.never<NullType<number>>(true)
	type.never<NullType<boolean>>(true)
	type.never<NullType<true>>(true)
	type.never<NullType<false>>(true)
	type.never<NullType<string>>(true)
	type.never<NullType<''>>(true)
	type.never<NullType<symbol>>(true)
	type.never<NullType<bigint>>(true)
	type.never<NullType<{}>>(true)
	type.never<NullType<string[]>>(true)
	type.never<NullType<[]>>(true)
	type.never<NullType<Function>>(true)
	type.never<NullType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<NullType<null | 1>>(true)
})

it('can override Then/Else', () => {
	type.equal<NullType<null, 1, 2>, 1>(true)

	type.equal<NullType<any, 1, 2>, 2>(true)
	type.equal<NullType<unknown, 1, 2>, 2>(true)
	type.equal<NullType<never, 1, 2>, 2>(true)
	type.equal<NullType<void, 1, 2>, 2>(true)
})

test('union behavior of null', () => {
	type.equal<null | undefined, null | undefined>(true)
	type.equal<null | null, null>(true)
	type.equal<null | boolean, null | boolean>(true)
	type.equal<null | true, null | true>(true)
	type.equal<null | false, null | false>(true)
	type.equal<null | number, null | number>(true)
	type.equal<null | 1, null | 1>(true)
	type.equal<null | string, null | string>(true)
	type.equal<null | '', null | ''>(true)
	type.equal<null | symbol, null | symbol>(true)
	type.equal<null | bigint, null | bigint>(true)
	type.equal<null | 1n, null | 1n>(true)
	type.equal<null | {}, null | {}>(true)
	type.equal<null | { a: 1 }, null | { a: 1 }>(true)
	type.equal<null | string[], null | string[]>(true)
	type.equal<null | [], null | []>(true)
	type.equal<null | null, null>(true)
	type.equal<null | (() => void), null | (() => void)>(true)

	type.equal<null | any, any>(true)
	type.equal<null | unknown, unknown>(true)
	type.equal<null | never, null>(true)
	type.equal<null | void, null | void>(true)
})

test('intersection behavior of null', () => {
	type.equal<null & undefined, never>(true)
	type.equal<null & null, null>(true)

	type.equal<null & boolean, never>(true)
	type.equal<null & true, never>(true)
	type.equal<null & false, never>(true)

	type.equal<null & number, never>(true)
	type.equal<null & 1, never>(true)
	type.equal<null & string, never>(true)
	type.equal<null & '', never>(true)
	type.equal<null & symbol, never>(true)
	type.equal<null & bigint, never>(true)
	type.equal<null & 1n, never>(true)

	type.equal<null & {}, never>(true)

	type.equal<null & { a: 1 }, never>(true)
	type.equal<null & string[], never>(true)
	type.equal<null & [], never>(true)
	type.equal<null & null, null>(true)
	type.equal<null & (() => void), never>(true)

	type.equal<null & any, any>(true)
	type.equal<null & unknown, null>(true)
	type.equal<null & never, never>(true)
	type.equal<null & void, never>(true)
})
