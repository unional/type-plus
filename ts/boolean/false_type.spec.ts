import { FalseType, testType } from '../index.js'

it('returns T if T is false', () => {
	testType.equal<FalseType<false>, false>(true)
})

it('returns never if T is boolean or true', () => {
	testType.never<FalseType<boolean>>(true)
	testType.never<FalseType<true>>(true)
})

it('returns never for special types', () => {
	testType.never<FalseType<void>>(true)
	testType.never<FalseType<unknown>>(true)
	testType.never<FalseType<any>>(true)
	testType.never<FalseType<never>>(true)
})

it('returns never for other types', () => {
	testType.never<FalseType<undefined>>(true)
	testType.never<FalseType<null>>(true)
	testType.never<FalseType<number>>(true)
	testType.never<FalseType<1>>(true)
	testType.never<FalseType<string>>(true)
	testType.never<FalseType<''>>(true)
	testType.never<FalseType<symbol>>(true)
	testType.never<FalseType<bigint>>(true)
	testType.never<FalseType<1n>>(true)
	testType.never<FalseType<{}>>(true)
	testType.never<FalseType<{ a: 1 }>>(true)
	testType.never<FalseType<string[]>>(true)
	testType.never<FalseType<[]>>(true)
	testType.never<FalseType<Function>>(true)
	testType.never<FalseType<() => void>>(true)
})

test('union behavior of false', () => {
	testType.equal<false | undefined, false | undefined>(true)
	testType.equal<false | null, false | null>(true)

	testType.equal<false | boolean, boolean>(true)
	testType.equal<false | true, boolean>(true)
	testType.equal<false | false, false>(true)

	testType.equal<false | number, false | number>(true)
	testType.equal<false | 1, false | 1>(true)
	testType.equal<false | string, false | string>(true)
	testType.equal<false | '', false | ''>(true)
	testType.equal<false | symbol, false | symbol>(true)
	testType.equal<false | bigint, false | bigint>(true)
	testType.equal<false | 1n, false | 1n>(true)
	testType.equal<false | {}, false | {}>(true)
	testType.equal<false | { a: 1 }, false | { a: 1 }>(true)
	testType.equal<false | string[], false | string[]>(true)
	testType.equal<false | [], false | []>(true)
	testType.equal<false | Function, false | Function>(true)
	testType.equal<false | (() => void), false | (() => void)>(true)

	testType.equal<false | any, any>(true)
	testType.equal<false | unknown, unknown>(true)
	testType.equal<false | never, false>(true)
	testType.equal<false | void, false | void>(true)
})

test('intersection behavior of false', () => {
	testType.equal<false & undefined, never>(true)
	testType.equal<false & null, never>(true)

	testType.equal<false & boolean, false>(true)
	testType.equal<false & true, never>(true)
	testType.equal<false & false, false>(true)

	testType.equal<false & number, never>(true)
	testType.equal<false & 1, never>(true)
	testType.equal<false & string, never>(true)
	testType.equal<false & '', never>(true)
	testType.equal<false & symbol, never>(true)
	testType.equal<false & bigint, never>(true)
	testType.equal<false & 1n, never>(true)

	testType.equal<false & {}, false>(true)
	testType.equal<false & { a: 1 }, false & { a: 1 }>(true)
	testType.equal<false & string[], false & string[]>(true)
	testType.equal<false & [], false & []>(true)
	testType.equal<false & Function, false & Function>(true)
	testType.equal<false & (() => void), false & (() => void)>(true)

	testType.equal<false & any, any>(true)
	testType.equal<false & unknown, false>(true)
	testType.equal<false & never, never>(true)
	testType.equal<false & void, never>(true)
})

it('returns never for union type', () => {
	testType.never<FalseType<false | 1>>(true)
	testType.never<FalseType<false | boolean>>(true)
})

it('returns never for intersection type', () => {
	testType.never<FalseType<false & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<FalseType<false, 1, 2>, 1>(true)
	testType.equal<FalseType<0, 1, 2>, 2>(true)

	testType.equal<FalseType<any, 1, 2>, 2>(true)
	testType.equal<FalseType<unknown, 1, 2>, 2>(true)
	testType.equal<FalseType<never, 1, 2>, 2>(true)
	testType.equal<FalseType<void, 1, 2>, 2>(true)
})
