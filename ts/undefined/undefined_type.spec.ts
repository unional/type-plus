import { type, type UndefinedType } from '../index.js'

it('returns T if T is undefined', () => {
	type.equal<UndefinedType<undefined>, undefined>(true)
})

it('returns never for special types', () => {
	type.never<UndefinedType<any>>(true)
	type.never<UndefinedType<unknown>>(true)
	type.never<UndefinedType<void>>(true)
	type.never<UndefinedType<never>>(true)
})

test('returns never for other types', () => {
	type.never<UndefinedType<null>>(true)
	type.never<UndefinedType<number>>(true)
	type.never<UndefinedType<1>>(true)
	type.never<UndefinedType<boolean>>(true)
	type.never<UndefinedType<true>>(true)
	type.never<UndefinedType<false>>(true)
	type.never<UndefinedType<string>>(true)
	type.never<UndefinedType<''>>(true)
	type.never<UndefinedType<symbol>>(true)
	type.never<UndefinedType<bigint>>(true)
	type.never<UndefinedType<1n>>(true)
	type.never<UndefinedType<{}>>(true)
	type.never<UndefinedType<string[]>>(true)
	type.never<UndefinedType<[]>>(true)
	type.never<UndefinedType<Function>>(true)
	type.never<UndefinedType<() => void>>(true)
})

it('returns never for union type', () => {
	type.never<UndefinedType<undefined | 1>>(true)
})

it('returns never as undefined & any => any', () => {
	type.never<UndefinedType<undefined & any>>(true)
})

it('returns undefined as undefined & unknown => undefined', () => {
	type.equal<UndefinedType<undefined & unknown>, undefined & unknown, undefined>(true)
})

it('returns undefined as undefined & void => undefined', () => {
	type.equal<UndefinedType<undefined & void>, undefined & void, undefined>(true)
})

it('returns never as undefined & never => never', () => {
	type.equal<UndefinedType<undefined & never>, undefined & never, never>(true)
})

it('returns never as undefined & <others> => never', () => {
	type.equal<UndefinedType<undefined & null>, undefined & null, never>(true)
	type.equal<UndefinedType<undefined & number>, undefined & number, never>(true)
	type.equal<UndefinedType<undefined & 1>, undefined & 1, never>(true)
	type.equal<UndefinedType<undefined & boolean>, undefined & boolean, never>(true)
	type.equal<UndefinedType<undefined & true>, undefined & true, never>(true)
	type.equal<UndefinedType<undefined & false>, undefined & false, never>(true)
	type.equal<UndefinedType<undefined & string>, undefined & string, never>(true)
	type.equal<UndefinedType<undefined & ''>, undefined & '', never>(true)
	type.equal<UndefinedType<undefined & symbol>, undefined & symbol, never>(true)
	type.equal<UndefinedType<undefined & bigint>, undefined & bigint, never>(true)
	type.equal<UndefinedType<undefined & 1n>, undefined & 1n, never>(true)
	type.equal<UndefinedType<undefined & {}>, undefined & {}, never>(true)
	type.equal<UndefinedType<undefined & { a: 1 }>, undefined & { a: 1 }, never>(true)
	type.equal<UndefinedType<undefined & string[]>, undefined & string[], never>(true)
	type.equal<UndefinedType<undefined & []>, undefined & [], never>(true)
	type.equal<UndefinedType<undefined & Function>, undefined & Function, never>(true)
	type.equal<UndefinedType<undefined & (() => void)>, undefined & (() => void), never>(true)
})

it('can override Then/Else', () => {
	type.equal<UndefinedType<undefined, 1, 2>, 1>(true)
	type.equal<UndefinedType<0, 1, 2>, 2>(true)

	type.equal<UndefinedType<any, 1, 2>, 2>(true)
	type.equal<UndefinedType<unknown, 1, 2>, 2>(true)
	type.equal<UndefinedType<never, 1, 2>, 2>(true)
	type.equal<UndefinedType<void, 1, 2>, 2>(true)
})

test('union behavior of undefined', () => {
	type.equal<undefined | null, undefined | null>(true)
	type.equal<undefined | boolean, undefined | boolean>(true)
	type.equal<undefined | true, undefined | true>(true)
	type.equal<undefined | false, undefined | false>(true)
	type.equal<undefined | number, undefined | number>(true)
	type.equal<undefined | 1, undefined | 1>(true)
	type.equal<undefined | string, undefined | string>(true)
	type.equal<undefined | '', undefined | ''>(true)
	type.equal<undefined | symbol, undefined | symbol>(true)
	type.equal<undefined | bigint, undefined | bigint>(true)
	type.equal<undefined | 1n, undefined | 1n>(true)
	type.equal<undefined | {}, undefined | {}>(true)
	type.equal<undefined | { a: 1 }, undefined | { a: 1 }>(true)
	type.equal<undefined | string[], undefined | string[]>(true)
	type.equal<undefined | [], undefined | []>(true)
	type.equal<undefined | Function, undefined | Function>(true)
	type.equal<undefined | (() => void), undefined | (() => void)>(true)

	type.equal<undefined | any, any>(true)
	type.equal<undefined | unknown, unknown>(true)
	type.equal<undefined | never, undefined>(true)
	type.equal<undefined | void, void>(true)
})

test('intersection behavior of undefined', () => {
	type.equal<undefined & null, never>(true)
	type.equal<undefined & boolean, never>(true)
	type.equal<undefined & true, never>(true)
	type.equal<undefined & false, never>(true)
	type.equal<undefined & number, never>(true)
	type.equal<undefined & 1, never>(true)
	type.equal<undefined & string, never>(true)
	type.equal<undefined & '', never>(true)
	type.equal<undefined & symbol, never>(true)
	type.equal<undefined & bigint, never>(true)
	type.equal<undefined & 1n, never>(true)
	type.equal<undefined & {}, never>(true)
	type.equal<undefined & { a: 1 }, never>(true)
	type.equal<undefined & string[], never>(true)
	type.equal<undefined & [], never>(true)
	type.equal<undefined & Function, never>(true)
	type.equal<undefined & (() => void), never>(true)

	type.equal<undefined & any, any>(true)
	type.equal<undefined & unknown, undefined>(true)
	type.equal<undefined & never, never>(true)
	type.equal<undefined & void, undefined>(true)
})
