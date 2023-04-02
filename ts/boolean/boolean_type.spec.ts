import { testType, type BooleanType } from '../index.js'

it('returns T if T is boolean', () => {
	testType.equal<BooleanType<boolean>, boolean>(true)
	testType.equal<BooleanType<true>, true>(true)
	testType.equal<BooleanType<false>, false>(true)
})

it('returns never for special types', () => {
	testType.never<BooleanType<void>>(true)
	testType.never<BooleanType<unknown>>(true)
	testType.never<BooleanType<any>>(true)
	testType.never<BooleanType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<BooleanType<undefined>>(true)
	testType.never<BooleanType<null>>(true)
	testType.never<BooleanType<number>>(true)
	testType.never<BooleanType<1>>(true)
	testType.never<BooleanType<string>>(true)
	testType.never<BooleanType<''>>(true)
	testType.never<BooleanType<symbol>>(true)
	testType.never<BooleanType<bigint>>(true)
	testType.never<BooleanType<1n>>(true)
	testType.never<BooleanType<{}>>(true)
	testType.never<BooleanType<{ a: 1 }>>(true)
	testType.never<BooleanType<string[]>>(true)
	testType.never<BooleanType<[]>>(true)
	testType.never<BooleanType<Function>>(true)
	testType.never<BooleanType<() => void>>(true)
})

test('union behavior of boolean', () => {
	testType.equal<boolean | undefined, boolean | undefined>(true)
	testType.equal<boolean | null, boolean | null>(true)

	testType.equal<boolean | boolean, boolean>(true)
	testType.equal<boolean | true, boolean>(true)
	testType.equal<boolean | false, boolean>(true)

	testType.equal<boolean | number, boolean | number>(true)
	testType.equal<boolean | 1, boolean | 1>(true)
	testType.equal<boolean | string, boolean | string>(true)
	testType.equal<boolean | '', boolean | ''>(true)
	testType.equal<boolean | symbol, boolean | symbol>(true)
	testType.equal<boolean | bigint, boolean | bigint>(true)
	testType.equal<boolean | 1n, boolean | 1n>(true)
	testType.equal<boolean | {}, boolean | {}>(true)
	testType.equal<boolean | { a: 1 }, boolean | { a: 1 }>(true)
	testType.equal<boolean | string[], boolean | string[]>(true)
	testType.equal<boolean | [], boolean | []>(true)
	testType.equal<boolean | Function, boolean | Function>(true)
	testType.equal<boolean | (() => void), boolean | (() => void)>(true)

	testType.equal<boolean | any, any>(true)
	testType.equal<boolean | unknown, unknown>(true)
	testType.equal<boolean | never, boolean>(true)
	testType.equal<boolean | void, boolean | void>(true)
})

test('intersection behavior of boolean', () => {
	testType.equal<boolean & undefined, never>(true)
	testType.equal<boolean & null, never>(true)

	testType.equal<boolean & boolean, boolean>(true)
	testType.equal<boolean & true, true>(true)
	testType.equal<boolean & false, false>(true)

	testType.equal<boolean & number, never>(true)
	testType.equal<boolean & 1, never>(true)
	testType.equal<boolean & string, never>(true)
	testType.equal<boolean & '', never>(true)
	testType.equal<boolean & symbol, never>(true)
	testType.equal<boolean & bigint, never>(true)
	testType.equal<boolean & 1n, never>(true)

	testType.equal<boolean & {}, boolean>(true)
	testType.equal<boolean & { a: 1 }, boolean & { a: 1 }>(true)
	testType.equal<boolean & string[], boolean & string[]>(true)
	testType.equal<boolean & [], boolean & []>(true)
	testType.equal<boolean & Function, boolean & Function>(true)
	testType.equal<boolean & (() => void), boolean & (() => void)>(true)

	testType.equal<boolean & any, any>(true)
	testType.equal<boolean & unknown, boolean>(true)
	testType.equal<boolean & never, never>(true)
	testType.equal<boolean & void, never>(true)
})

it('returns never for union type', () => {
	testType.never<BooleanType<boolean | 1>>(true)
})

it('returns T for intersection type', () => {
	testType.equal<BooleanType<boolean & { a: 1 }>, boolean & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<BooleanType<boolean, 1, 2>, 1>(true)
	testType.equal<BooleanType<0, 1, 2>, 2>(true)

	testType.equal<BooleanType<any, 1, 2>, 2>(true)
	testType.equal<BooleanType<unknown, 1, 2>, 2>(true)
	testType.equal<BooleanType<never, 1, 2>, 2>(true)
	testType.equal<BooleanType<void, 1, 2>, 2>(true)
})
