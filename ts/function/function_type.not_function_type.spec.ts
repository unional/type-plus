import { type, type AnyFunction, type NotFunctionType } from '../index.js'

it('returns never if T is Function', () => {
	type.never<NotFunctionType<Function>>(true)
})

it('returns never if T is function signature', () => {
	type.never<NotFunctionType<() => void>>(true)
	type.never<NotFunctionType<AnyFunction>>(true)
})

it('returns T for special types', () => {
	type.equal<NotFunctionType<void>, void>(true)
	type.equal<NotFunctionType<unknown>, unknown>(true)
	type.equal<NotFunctionType<any>, any>(true)
	type.equal<NotFunctionType<never>, never>(true)
})

it('returns T for all other types', () => {
	type.equal<NotFunctionType<undefined>, undefined>(true)
	type.equal<NotFunctionType<null>, null>(true)
	type.equal<NotFunctionType<boolean>, boolean>(true)
	type.equal<NotFunctionType<true>, true>(true)
	type.equal<NotFunctionType<false>, false>(true)
	type.equal<NotFunctionType<number>, number>(true)
	type.equal<NotFunctionType<1>, 1>(true)
	type.equal<NotFunctionType<string>, string>(true)
	type.equal<NotFunctionType<''>, ''>(true)
	type.equal<NotFunctionType<symbol>, symbol>(true)
	type.equal<NotFunctionType<bigint>, bigint>(true)
	type.equal<NotFunctionType<{}>, {}>(true)
	type.equal<NotFunctionType<string[]>, string[]>(true)
	type.equal<NotFunctionType<[]>, []>(true)
})

it('returns T if T is union of function and other types', () => {
	type.equal<NotFunctionType<(() => void) | { a: 1 }>, (() => void) | { a: 1 }>(true)
})

it('returns never if T is function overloads', () => {
	type.never<NotFunctionType<{ (): void; (x: number): number }>>(true)
})

it('returns never if T is intersection of function', () => {
	type.never<NotFunctionType<(() => void) & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<NotFunctionType<Function, 1, 2>, 2>(true)
	type.equal<NotFunctionType<{}, 1, 2>, 1>(true)

	type.equal<NotFunctionType<any, 1, 2>, 1>(true)
	type.equal<NotFunctionType<unknown, 1, 2>, 1>(true)
	type.equal<NotFunctionType<never, 1, 2>, 1>(true)
	type.equal<NotFunctionType<void, 1, 2>, 1>(true)
})
