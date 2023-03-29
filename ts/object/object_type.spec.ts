import { type, type ObjectType } from '../index.js'

it('returns T if T is object', () => {
	type.equal<ObjectType<object>, object>(true)
})

it('returns T if T is object literal', () => {
	type.equal<ObjectType<{}>, {}>(true)
	type.equal<ObjectType<{ a: 1 }>, { a: 1 }>(true)
})

it('returns T if T is function as function is a subtype of object', () => {
	type.equal<ObjectType<Function>, Function>(true)
	type.equal<ObjectType<() => void>, () => void>(true)
})

it('returns T if T is array or tuple', () => {
	type.equal<ObjectType<string[]>, string[]>(true)
	type.equal<ObjectType<[]>, []>(true)
	type.equal<ObjectType<[1, 2]>, [1, 2]>(true)
})

it('handles readonly', () => {
	type.equal<ObjectType<readonly [1, 2]>, readonly [1, 2]>(true)
})

it('handles mapped', () => {
	type.equal<ObjectType<{ [K in 'a']: 1 }>, { [K in 'a']: 1 }>(true)
})

it('handles indexed', () => {
	type.equal<ObjectType<{ [K: string]: 1 }>, { [K: string]: 1 }>(true)
})

it('returns never for special types', () => {
	type.never<ObjectType<void>>(true)
	type.never<ObjectType<unknown>>(true)
	type.never<ObjectType<any>>(true)
	type.never<ObjectType<never>>(true)
})

it('returns never for primitive types', () => {
	type.never<ObjectType<undefined>>(true)
	type.never<ObjectType<null>>(true)
	type.never<ObjectType<boolean>>(true)
	type.never<ObjectType<true>>(true)
	type.never<ObjectType<false>>(true)
	type.never<ObjectType<number>>(true)
	type.never<ObjectType<1>>(true)
	type.never<ObjectType<string>>(true)
	type.never<ObjectType<''>>(true)
	type.never<ObjectType<symbol>>(true)
	type.never<ObjectType<bigint>>(true)
	type.never<ObjectType<1n>>(true)
})

it('returns never if T is union of object', () => {
	type.never<ObjectType<object | 1>>(true)
})

it('returns T if T is intersection of object', () => {
	type.equal<ObjectType<object & string[]>, object & string[]>(true)
})

it('can override Then/Else', () => {
	type.equal<ObjectType<object, 1, 2>, 1>(true)
	type.equal<ObjectType<0, 1, 2>, 2>(true)

	type.equal<ObjectType<any, 1, 2>, 2>(true)
	type.equal<ObjectType<unknown, 1, 2>, 2>(true)
	type.equal<ObjectType<never, 1, 2>, 2>(true)
	type.equal<ObjectType<void, 1, 2>, 2>(true)
})

test('union behavior of object', () => {
	type.equal<object | undefined, object | undefined>(true)
	type.equal<object | null, object | null>(true)
	type.equal<object | boolean, object | boolean>(true)
	type.equal<object | true, object | true>(true)
	type.equal<object | false, object | false>(true)
	type.equal<object | number, object | number>(true)
	type.equal<object | 1, object | 1>(true)
	type.equal<object | string, object | string>(true)
	type.equal<object | '', object | ''>(true)
	type.equal<object | symbol, object | symbol>(true)
	type.equal<object | bigint, object | bigint>(true)
	type.equal<object | 1n, object | 1n>(true)
	type.equal<object | {}, object | {}>(true)
	type.equal<object | { a: 1 }, object | { a: 1 }>(true)
	type.equal<object | string[], object | string[]>(true)
	type.equal<object | [], object | []>(true)
	type.equal<object | Function, object | Function>(true)
	type.equal<object | (() => void), object | (() => void)>(true)

	type.equal<object | any, any>(true)
	type.equal<object | unknown, unknown>(true)
	type.equal<object | never, object>(true)
	type.equal<object | void, object | void>(true)
})

test('intersection behavior of object', () => {
	type.equal<object & undefined, never>(true)
	type.equal<object & null, never>(true)

	type.equal<object & boolean, never>(true)
	type.equal<object & true, never>(true)
	type.equal<object & false, never>(true)

	type.equal<object & number, never>(true)
	type.equal<object & 1, never>(true)
	type.equal<object & string, never>(true)
	type.equal<object & '', never>(true)
	type.equal<object & symbol, never>(true)
	type.equal<object & bigint, never>(true)
	type.equal<object & 1n, never>(true)

	type.equal<object & {}, object>(true)

	type.equal<object & { a: 1 }, object & { a: 1 }>(true)
	type.equal<object & string[], object & string[]>(true)
	type.equal<object & [], object & []>(true)
	type.equal<object & Function, object & Function>(true)
	type.equal<object & (() => void), object & (() => void)>(true)

	type.equal<object & any, any>(true)
	type.equal<object & unknown, object>(true)
	type.equal<object & never, never>(true)
	type.equal<object & void, never>(true)
})
