import { type, type BooleanType } from '../index.js'

it('returns T if T is boolean', () => {
	type.equal<BooleanType<boolean>, boolean>(true)
	type.equal<BooleanType<true>, true>(true)
	type.equal<BooleanType<false>, false>(true)
})

it('returns never for special types', () => {
	type.never<BooleanType<void>>(true)
	type.never<BooleanType<unknown>>(true)
	type.never<BooleanType<any>>(true)
	type.never<BooleanType<never>>(true)
})

it('returns never for other types', () => {
	type.never<BooleanType<undefined>>(true)
	type.never<BooleanType<null>>(true)
	type.never<BooleanType<number>>(true)
	type.never<BooleanType<1>>(true)
	type.never<BooleanType<string>>(true)
	type.never<BooleanType<''>>(true)
	type.never<BooleanType<symbol>>(true)
	type.never<BooleanType<bigint>>(true)
	type.never<BooleanType<1n>>(true)
	type.never<BooleanType<{}>>(true)
	type.never<BooleanType<{ a: 1 }>>(true)
	type.never<BooleanType<string[]>>(true)
	type.never<BooleanType<[]>>(true)
	type.never<BooleanType<Function>>(true)
	type.never<BooleanType<() => void>>(true)
})

test('union behavior of boolean', () => {
	type.equal<boolean | undefined, boolean | undefined>(true)
	type.equal<boolean | null, boolean | null>(true)

	type.equal<boolean | boolean, boolean>(true)
	type.equal<boolean | true, boolean>(true)
	type.equal<boolean | false, boolean>(true)

	type.equal<boolean | number, boolean | number>(true)
	type.equal<boolean | 1, boolean | 1>(true)
	type.equal<boolean | string, boolean | string>(true)
	type.equal<boolean | '', boolean | ''>(true)
	type.equal<boolean | symbol, boolean | symbol>(true)
	type.equal<boolean | bigint, boolean | bigint>(true)
	type.equal<boolean | 1n, boolean | 1n>(true)
	type.equal<boolean | {}, boolean | {}>(true)
	type.equal<boolean | { a: 1 }, boolean | { a: 1 }>(true)
	type.equal<boolean | string[], boolean | string[]>(true)
	type.equal<boolean | [], boolean | []>(true)
	type.equal<boolean | Function, boolean | Function>(true)
	type.equal<boolean | (() => void), boolean | (() => void)>(true)

	type.equal<boolean | any, any>(true)
	type.equal<boolean | unknown, unknown>(true)
	type.equal<boolean | never, boolean>(true)
	type.equal<boolean | void, boolean | void>(true)
})

test('intersection behavior of boolean', () => {
	type.equal<boolean & undefined, never>(true)
	type.equal<boolean & null, never>(true)

	type.equal<boolean & boolean, boolean>(true)
	type.equal<boolean & true, true>(true)
	type.equal<boolean & false, false>(true)

	type.equal<boolean & number, never>(true)
	type.equal<boolean & 1, never>(true)
	type.equal<boolean & string, never>(true)
	type.equal<boolean & '', never>(true)
	type.equal<boolean & symbol, never>(true)
	type.equal<boolean & bigint, never>(true)
	type.equal<boolean & 1n, never>(true)

	type.equal<boolean & {}, boolean>(true)
	type.equal<boolean & { a: 1 }, boolean & { a: 1 }>(true)
	type.equal<boolean & string[], boolean & string[]>(true)
	type.equal<boolean & [], boolean & []>(true)
	type.equal<boolean & Function, boolean & Function>(true)
	type.equal<boolean & (() => void), boolean & (() => void)>(true)

	type.equal<boolean & any, any>(true)
	type.equal<boolean & unknown, boolean>(true)
	type.equal<boolean & never, never>(true)
	type.equal<boolean & void, never>(true)
})

it('returns never for union type', () => {
	type.never<BooleanType<boolean | 1>>(true)
})

it('returns T for intersection type', () => {
	type.equal<BooleanType<boolean & { a: 1 }>, boolean & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	type.equal<BooleanType<boolean, 1, 2>, 1>(true)
	type.equal<BooleanType<0, 1, 2>, 2>(true)

	type.equal<BooleanType<any, 1, 2>, 2>(true)
	type.equal<BooleanType<unknown, 1, 2>, 2>(true)
	type.equal<BooleanType<never, 1, 2>, 2>(true)
	type.equal<BooleanType<void, 1, 2>, 2>(true)
})
