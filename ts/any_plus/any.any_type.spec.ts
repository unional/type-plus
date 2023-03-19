import { PrimitiveTypes, isType, type AnyType } from '../index.js'

test('any is any', () => {
	// this is not a complete test, but oh well,
	// IsAny<T> and other tests here should sufficiently cover the case.
	isType.equal<true, any, AnyType<any>>()
})

test('unknown is not any', () => {
	isType.never<AnyType<unknown>>()
})

test('primitive types are not any', () => {
	isType.never<AnyType<undefined>>()
	isType.never<AnyType<null>>()
	isType.never<AnyType<number>>()
	isType.never<AnyType<boolean>>()
	isType.never<AnyType<string>>()
	isType.never<AnyType<symbol>>()
	isType.never<AnyType<unknown>>()
	isType.never<AnyType<never>>()
	isType.never<AnyType<{}>>()
	isType.never<AnyType<void>>()
	isType.never<AnyType<PrimitiveTypes>>()
})

test('never is not any', () => {
	isType.never<AnyType<never>>()
})

test('fake symbol return false as symbol is unique', () => {
	const s = Symbol.for('any')
	type S = typeof s
	isType.never<AnyType<S>>()
})

it('can override Then/Else', () => {
	isType.equal<true, AnyType<any, 1, 2>, 1>()
	isType.equal<true, AnyType<never, 1, 2>, 2>()
})
