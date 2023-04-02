import { testType, type ObjectType } from '../index.js'

it('returns T if T is object', () => {
	testType.equal<ObjectType<object>, object>(true)
})

it('returns T if T is object literal', () => {
	testType.equal<ObjectType<{}>, {}>(true)
	testType.equal<ObjectType<{ a: 1 }>, { a: 1 }>(true)
})

it('returns T if T is function as function is a subtype of object', () => {
	testType.equal<ObjectType<Function>, Function>(true)
	testType.equal<ObjectType<() => void>, () => void>(true)
})

it('returns T if T is array or tuple', () => {
	testType.equal<ObjectType<string[]>, string[]>(true)
	testType.equal<ObjectType<[]>, []>(true)
	testType.equal<ObjectType<[1, 2]>, [1, 2]>(true)
})

it('handles readonly', () => {
	testType.equal<ObjectType<readonly [1, 2]>, readonly [1, 2]>(true)
})

it('handles mapped', () => {
	testType.equal<ObjectType<{ [K in 'a']: 1 }>, { [K in 'a']: 1 }>(true)
})

it('handles indexed', () => {
	testType.equal<ObjectType<{ [K: string]: 1 }>, { [K: string]: 1 }>(true)
})

it('returns never for special types', () => {
	testType.never<ObjectType<void>>(true)
	testType.never<ObjectType<unknown>>(true)
	testType.never<ObjectType<any>>(true)
	testType.never<ObjectType<never>>(true)
})

it('returns never for primitive types', () => {
	testType.never<ObjectType<undefined>>(true)
	testType.never<ObjectType<null>>(true)
	testType.never<ObjectType<boolean>>(true)
	testType.never<ObjectType<true>>(true)
	testType.never<ObjectType<false>>(true)
	testType.never<ObjectType<number>>(true)
	testType.never<ObjectType<1>>(true)
	testType.never<ObjectType<string>>(true)
	testType.never<ObjectType<''>>(true)
	testType.never<ObjectType<symbol>>(true)
	testType.never<ObjectType<bigint>>(true)
	testType.never<ObjectType<1n>>(true)
})

it('returns never if T is union of object', () => {
	testType.never<ObjectType<object | 1>>(true)
})

it('returns T if T is intersection of object', () => {
	testType.equal<ObjectType<object & string[]>, object & string[]>(true)
})

it('can override Then/Else', () => {
	testType.equal<ObjectType<object, 1, 2>, 1>(true)
	testType.equal<ObjectType<0, 1, 2>, 2>(true)

	testType.equal<ObjectType<any, 1, 2>, 2>(true)
	testType.equal<ObjectType<unknown, 1, 2>, 2>(true)
	testType.equal<ObjectType<never, 1, 2>, 2>(true)
	testType.equal<ObjectType<void, 1, 2>, 2>(true)
})

test('union behavior of object', () => {
	testType.equal<object | undefined, object | undefined>(true)
	testType.equal<object | null, object | null>(true)
	testType.equal<object | boolean, object | boolean>(true)
	testType.equal<object | true, object | true>(true)
	testType.equal<object | false, object | false>(true)
	testType.equal<object | number, object | number>(true)
	testType.equal<object | 1, object | 1>(true)
	testType.equal<object | string, object | string>(true)
	testType.equal<object | '', object | ''>(true)
	testType.equal<object | symbol, object | symbol>(true)
	testType.equal<object | bigint, object | bigint>(true)
	testType.equal<object | 1n, object | 1n>(true)
	testType.equal<object | {}, object | {}>(true)
	testType.equal<object | { a: 1 }, object | { a: 1 }>(true)
	testType.equal<object | string[], object | string[]>(true)
	testType.equal<object | [], object | []>(true)
	testType.equal<object | Function, object | Function>(true)
	testType.equal<object | (() => void), object | (() => void)>(true)

	testType.equal<object | any, any>(true)
	testType.equal<object | unknown, unknown>(true)
	testType.equal<object | never, object>(true)
	testType.equal<object | void, object | void>(true)
})

test('intersection behavior of object', () => {
	testType.equal<object & undefined, never>(true)
	testType.equal<object & null, never>(true)

	testType.equal<object & boolean, never>(true)
	testType.equal<object & true, never>(true)
	testType.equal<object & false, never>(true)

	testType.equal<object & number, never>(true)
	testType.equal<object & 1, never>(true)
	testType.equal<object & string, never>(true)
	testType.equal<object & '', never>(true)
	testType.equal<object & symbol, never>(true)
	testType.equal<object & bigint, never>(true)
	testType.equal<object & 1n, never>(true)

	testType.equal<object & {}, object>(true)

	testType.equal<object & { a: 1 }, object & { a: 1 }>(true)
	testType.equal<object & string[], object & string[]>(true)
	testType.equal<object & [], object & []>(true)
	testType.equal<object & Function, object & Function>(true)
	testType.equal<object & (() => void), object & (() => void)>(true)

	testType.equal<object & any, any>(true)
	testType.equal<object & unknown, object>(true)
	testType.equal<object & never, never>(true)
	testType.equal<object & void, never>(true)
})
