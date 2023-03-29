import { type, type AnyFunction, type NotStrictFunctionType } from '../index.js'

it('returns never if T is Function', () => {
	type.never<NotStrictFunctionType<Function>>(true)
})

it('returns T if T is function signature', () => {
	type.equal<NotStrictFunctionType<() => void>, () => void>(true)
	type.equal<NotStrictFunctionType<AnyFunction>, AnyFunction>(true)
})

it('returns T if T is function overloads', () => {
	type.equal<NotStrictFunctionType<{ (): void; (x: number): number }>, { (): void; (x: number): number }>(
		true
	)
})
it('returns T for special types', () => {
	type.equal<NotStrictFunctionType<void>, void>(true)
	type.equal<NotStrictFunctionType<unknown>, unknown>(true)
	type.equal<NotStrictFunctionType<any>, any>(true)
	type.equal<NotStrictFunctionType<never>, never>(true)
})

it('returns T for all other types', () => {
	type.equal<NotStrictFunctionType<undefined>, undefined>(true)
	type.equal<NotStrictFunctionType<null>, null>(true)
	type.equal<NotStrictFunctionType<boolean>, boolean>(true)
	type.equal<NotStrictFunctionType<true>, true>(true)
	type.equal<NotStrictFunctionType<false>, false>(true)
	type.equal<NotStrictFunctionType<number>, number>(true)
	type.equal<NotStrictFunctionType<1>, 1>(true)
	type.equal<NotStrictFunctionType<string>, string>(true)
	type.equal<NotStrictFunctionType<''>, ''>(true)
	type.equal<NotStrictFunctionType<symbol>, symbol>(true)
	type.equal<NotStrictFunctionType<bigint>, bigint>(true)
	type.equal<NotStrictFunctionType<1n>, 1n>(true)
	type.equal<NotStrictFunctionType<{}>, {}>(true)
	type.equal<NotStrictFunctionType<{ a: 1 }>, { a: 1 }>(true)
	type.equal<NotStrictFunctionType<string[]>, string[]>(true)
	type.equal<NotStrictFunctionType<[]>, []>(true)
})

it('returns T if T is union of function and other types', () => {
	type.equal<NotStrictFunctionType<Function | { a: 1 }>, Function | { a: 1 }>(true)
})

it('returns T if T is intersection of function', () => {
	type.equal<NotStrictFunctionType<Function & { a: 1 }>, Function & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	type.equal<NotStrictFunctionType<Function, 1, 2>, 2>(true)
	type.equal<NotStrictFunctionType<{}, 1, 2>, 1>(true)

	type.equal<NotStrictFunctionType<any, 1, 2>, 1>(true)
	type.equal<NotStrictFunctionType<unknown, 1, 2>, 1>(true)
	type.equal<NotStrictFunctionType<never, 1, 2>, 1>(true)
	type.equal<NotStrictFunctionType<void, 1, 2>, 1>(true)
})
