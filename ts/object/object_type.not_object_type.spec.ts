import { it } from '@jest/globals'
import { testType, type NotObjectType } from '../index.js'

it('returns never if T is object', () => {
	testType.equal<NotObjectType<object>, never>(true)
})

it('returns never if T is object literal', () => {
	testType.equal<NotObjectType<{}>, never>(true)
	testType.equal<NotObjectType<{ a: 1 }>, never>(true)
})

it('returns never if T is function as function is a subtype of object', () => {
	testType.equal<NotObjectType<Function>, never>(true)
	testType.equal<NotObjectType<() => void>, never>(true)
})

it('returns never if T is array or tuple', () => {
	testType.equal<NotObjectType<string[]>, never>(true)
	testType.equal<NotObjectType<[]>, never>(true)
	testType.equal<NotObjectType<[1, 2]>, never>(true)
})

it('handles readonly', () => {
	testType.equal<NotObjectType<readonly [1, 2]>, never>(true)
})

it('handles mapped', () => {
	testType.equal<NotObjectType<{ [K in 'a']: 1 }>, never>(true)
})

it('handles indexed', () => {
	testType.equal<NotObjectType<{ [K: string]: 1 }>, never>(true)
})

it('returns T for special types', () => {
	testType.equal<NotObjectType<void>, void>(true)
	testType.equal<NotObjectType<unknown>, unknown>(true)
	testType.equal<NotObjectType<any>, any>(true)
	testType.equal<NotObjectType<never>, never>(true)
})

it('returns T for primitive types', () => {
	testType.equal<NotObjectType<undefined>, undefined>(true)
	testType.equal<NotObjectType<null>, null>(true)
	testType.equal<NotObjectType<boolean>, boolean>(true)
	testType.equal<NotObjectType<true>, true>(true)
	testType.equal<NotObjectType<false>, false>(true)
	testType.equal<NotObjectType<number>, number>(true)
	testType.equal<NotObjectType<1>, 1>(true)
	testType.equal<NotObjectType<string>, string>(true)
	testType.equal<NotObjectType<''>, ''>(true)
	testType.equal<NotObjectType<symbol>, symbol>(true)
	testType.equal<NotObjectType<bigint>, bigint>(true)
	testType.equal<NotObjectType<1n>, 1n>(true)
})

it('returns T if T is union of object', () => {
	testType.equal<NotObjectType<object | 1>, object | 1>(true)
})

it('returns never if T is intersection of object', () => {
	testType.never<NotObjectType<object & string[]>>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotObjectType<object, 1, 2>, 2>(true)
	testType.equal<NotObjectType<0, 1, 2>, 1>(true)

	testType.equal<NotObjectType<any, 1, 2>, 1>(true)
	testType.equal<NotObjectType<unknown, 1, 2>, 1>(true)
	testType.equal<NotObjectType<never, 1, 2>, 1>(true)
	testType.equal<NotObjectType<void, 1, 2>, 1>(true)
})
