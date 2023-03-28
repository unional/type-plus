import { FalseType, type } from '../index.js'

it('returns T if T is false', () => {
	type.equal<FalseType<false>, false>(true)
})

it('returns never if T is boolean or true', () => {
	type.never<FalseType<boolean>>(true)
	type.never<FalseType<true>>(true)
})

it('returns never for special types', () => {
	type.never<FalseType<void>>(true)
	type.never<FalseType<unknown>>(true)
	type.never<FalseType<any>>(true)
	type.never<FalseType<never>>(true)
})

it('returns never for other types', () => {
	type.never<FalseType<undefined>>(true)
	type.never<FalseType<null>>(true)
	type.never<FalseType<number>>(true)
	type.never<FalseType<1>>(true)
	type.never<FalseType<string>>(true)
	type.never<FalseType<''>>(true)
	type.never<FalseType<symbol>>(true)
	type.never<FalseType<bigint>>(true)
	type.never<FalseType<1n>>(true)
	type.never<FalseType<{}>>(true)
	type.never<FalseType<{ a: 1 }>>(true)
	type.never<FalseType<string[]>>(true)
	type.never<FalseType<[]>>(true)
	type.never<FalseType<Function>>(true)
	type.never<FalseType<() => void>>(true)
})

test('union behavior of false', () => {
	type.equal<false | undefined, false | undefined>(true)
	type.equal<false | null, false | null>(true)

	type.equal<false | boolean, boolean>(true)
	type.equal<false | true, boolean>(true)
	type.equal<false | false, false>(true)

	type.equal<false | number, false | number>(true)
	type.equal<false | 1, false | 1>(true)
	type.equal<false | string, false | string>(true)
	type.equal<false | '', false | ''>(true)
	type.equal<false | symbol, false | symbol>(true)
	type.equal<false | bigint, false | bigint>(true)
	type.equal<false | 1n, false | 1n>(true)
	type.equal<false | {}, false | {}>(true)
	type.equal<false | { a: 1 }, false | { a: 1 }>(true)
	type.equal<false | string[], false | string[]>(true)
	type.equal<false | [], false | []>(true)
	type.equal<false | Function, false | Function>(true)
	type.equal<false | (() => void), false | (() => void)>(true)

	type.equal<false | any, any>(true)
	type.equal<false | unknown, unknown>(true)
	type.equal<false | never, false>(true)
	type.equal<false | void, false | void>(true)
})

test('intersection behavior of false', () => {
	type.equal<false & undefined, never>(true)
	type.equal<false & null, never>(true)

	type.equal<false & boolean, false>(true)
	type.equal<false & true, never>(true)
	type.equal<false & false, false>(true)

	type.equal<false & number, never>(true)
	type.equal<false & 1, never>(true)
	type.equal<false & string, never>(true)
	type.equal<false & '', never>(true)
	type.equal<false & symbol, never>(true)
	type.equal<false & bigint, never>(true)
	type.equal<false & 1n, never>(true)

	type.equal<false & {}, false>(true)
	type.equal<false & { a: 1 }, false & { a: 1 }>(true)
	type.equal<false & string[], false & string[]>(true)
	type.equal<false & [], false & []>(true)
	type.equal<false & Function, false & Function>(true)
	type.equal<false & (() => void), false & (() => void)>(true)

	type.equal<false & any, any>(true)
	type.equal<false & unknown, false>(true)
	type.equal<false & never, never>(true)
	type.equal<false & void, never>(true)
})

it('returns never for union type', () => {
	type.never<FalseType<false | 1>>(true)
	type.never<FalseType<false | boolean>>(true)
})

it('returns never for intersection type', () => {
	type.never<FalseType<false & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<FalseType<false, 1, 2>, 1>(true)
	type.equal<FalseType<0, 1, 2>, 2>(true)

	type.equal<FalseType<any, 1, 2>, 2>(true)
	type.equal<FalseType<unknown, 1, 2>, 2>(true)
	type.equal<FalseType<never, 1, 2>, 2>(true)
	type.equal<FalseType<void, 1, 2>, 2>(true)
})
