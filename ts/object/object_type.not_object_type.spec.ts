import { type, type NotObjectType } from '../index.js'

it('returns never if T is object', () => {
	type.equal<NotObjectType<object>, never>(true)
})

it('returns never if T is object literal', () => {
	type.equal<NotObjectType<{}>, never>(true)
	type.equal<NotObjectType<{ a: 1 }>, never>(true)
})

it('returns never if T is function as function is a subtype of object', () => {
	type.equal<NotObjectType<Function>, never>(true)
	type.equal<NotObjectType<() => void>, never>(true)
})

it('returns never if T is array or tuple', () => {
	type.equal<NotObjectType<string[]>, never>(true)
	type.equal<NotObjectType<[]>, never>(true)
	type.equal<NotObjectType<[1, 2]>, never>(true)
})

it('handles readonly', () => {
	type.equal<NotObjectType<readonly [1, 2]>, never>(true)
})

it('handles mapped', () => {
	type.equal<NotObjectType<{ [K in 'a']: 1 }>, never>(true)
})

it('handles indexed', () => {
	type.equal<NotObjectType<{ [K: string]: 1 }>, never>(true)
})

it('returns T for special types', () => {
	type.equal<NotObjectType<void>, void>(true)
	type.equal<NotObjectType<unknown>, unknown>(true)
	type.equal<NotObjectType<any>, any>(true)
	type.equal<NotObjectType<never>, never>(true)
})

it('returns T for primitive types', () => {
	type.equal<NotObjectType<undefined>, undefined>(true)
	type.equal<NotObjectType<null>, null>(true)
	type.equal<NotObjectType<boolean>, boolean>(true)
	type.equal<NotObjectType<true>, true>(true)
	type.equal<NotObjectType<false>, false>(true)
	type.equal<NotObjectType<number>, number>(true)
	type.equal<NotObjectType<1>, 1>(true)
	type.equal<NotObjectType<string>, string>(true)
	type.equal<NotObjectType<''>, ''>(true)
	type.equal<NotObjectType<symbol>, symbol>(true)
	type.equal<NotObjectType<bigint>, bigint>(true)
	type.equal<NotObjectType<1n>, 1n>(true)
})

it('returns T if T is union of object', () => {
	type.equal<NotObjectType<object | 1>, object | 1>(true)
})

it('returns never if T is intersection of object', () => {
	type.never<NotObjectType<object & string[]>>(true)
})

it('can override Then/Else', () => {
	type.equal<NotObjectType<object, 1, 2>, 2>(true)
	type.equal<NotObjectType<0, 1, 2>, 1>(true)

	type.equal<NotObjectType<any, 1, 2>, 1>(true)
	type.equal<NotObjectType<unknown, 1, 2>, 1>(true)
	type.equal<NotObjectType<never, 1, 2>, 1>(true)
	type.equal<NotObjectType<void, 1, 2>, 1>(true)
})
