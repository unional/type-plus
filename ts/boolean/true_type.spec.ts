import { testType, type TrueType } from '../index.js'

it('returns T if T is true', () => {
	testType.equal<TrueType<true>, true>(true)
})

it('returns never if T is boolean or false', () => {
	testType.never<TrueType<boolean>>(true)
	testType.never<TrueType<false>>(true)
})

it('returns never for special types', () => {
	testType.never<TrueType<void>>(true)
	testType.never<TrueType<unknown>>(true)
	testType.never<TrueType<any>>(true)
	testType.never<TrueType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<TrueType<undefined>>(true)
	testType.never<TrueType<null>>(true)
	testType.never<TrueType<number>>(true)
	testType.never<TrueType<1>>(true)
	testType.never<TrueType<string>>(true)
	testType.never<TrueType<''>>(true)
	testType.never<TrueType<symbol>>(true)
	testType.never<TrueType<bigint>>(true)
	testType.never<TrueType<1n>>(true)
	testType.never<TrueType<{}>>(true)
	testType.never<TrueType<{ a: 1 }>>(true)
	testType.never<TrueType<string[]>>(true)
	testType.never<TrueType<[]>>(true)
	testType.never<TrueType<Function>>(true)
	testType.never<TrueType<() => void>>(true)
})

test('union behavior of true', () => {
	testType.equal<true | undefined, true | undefined>(true)
	testType.equal<true | null, true | null>(true)

	testType.equal<true | boolean, boolean>(true)
	testType.equal<true | true, true>(true)
	testType.equal<true | false, boolean>(true)

	testType.equal<true | number, true | number>(true)
	testType.equal<true | 1, true | 1>(true)
	testType.equal<true | string, true | string>(true)
	testType.equal<true | '', true | ''>(true)
	testType.equal<true | symbol, true | symbol>(true)
	testType.equal<true | bigint, true | bigint>(true)
	testType.equal<true | 1n, true | 1n>(true)
	testType.equal<true | {}, true | {}>(true)
	testType.equal<true | { a: 1 }, true | { a: 1 }>(true)
	testType.equal<true | string[], true | string[]>(true)
	testType.equal<true | [], true | []>(true)
	testType.equal<true | Function, true | Function>(true)
	testType.equal<true | (() => void), true | (() => void)>(true)

	testType.equal<true | any, any>(true)
	testType.equal<true | unknown, unknown>(true)
	testType.equal<true | never, true>(true)
	testType.equal<true | void, true | void>(true)
})

test('intersection behavior of true', () => {
	testType.equal<true & undefined, never>(true)
	testType.equal<true & null, never>(true)

	testType.equal<true & boolean, true>(true)
	testType.equal<true & true, true>(true)
	testType.equal<true & false, never>(true)

	testType.equal<true & number, never>(true)
	testType.equal<true & 1, never>(true)
	testType.equal<true & string, never>(true)
	testType.equal<true & '', never>(true)
	testType.equal<true & symbol, never>(true)
	testType.equal<true & bigint, never>(true)
	testType.equal<true & 1n, never>(true)

	testType.equal<true & {}, true>(true)
	testType.equal<true & { a: 1 }, true & { a: 1 }>(true)
	testType.equal<true & string[], true & string[]>(true)
	testType.equal<true & [], true & []>(true)
	testType.equal<true & Function, true & Function>(true)
	testType.equal<true & (() => void), true & (() => void)>(true)

	testType.equal<true & any, any>(true)
	testType.equal<true & unknown, true>(true)
	testType.equal<true & never, never>(true)
	testType.equal<true & void, never>(true)
})

it('returns never for union type', () => {
	testType.never<TrueType<true | 1>>(true)
	testType.never<TrueType<true | boolean>>(true)
})

it('returns never for intersection type', () => {
	testType.never<TrueType<true & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<TrueType<true, 1, 2>, 1>(true)

	testType.equal<TrueType<any, 1, 2>, 2>(true)
	testType.equal<TrueType<unknown, 1, 2>, 2>(true)
	testType.equal<TrueType<never, 1, 2>, 2>(true)
	testType.equal<TrueType<void, 1, 2>, 2>(true)
})
