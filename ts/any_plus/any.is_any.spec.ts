import { PrimitiveTypes, isType, type IsAny } from '../index.js'

test('any is any', () => {
	isType.equal<true, true, IsAny<any>>()
})

test('unknown is not any', () => {
	isType.equal<true, false, IsAny<unknown>>()
})

test('primitive types are not any', () => {
	isType.equal<true, false, IsAny<undefined>>()
	isType.equal<true, false, IsAny<null>>()
	isType.equal<true, false, IsAny<number>>()
	isType.equal<true, false, IsAny<boolean>>()
	isType.equal<true, false, IsAny<string>>()
	isType.equal<true, false, IsAny<symbol>>()
	isType.equal<true, false, IsAny<unknown>>()
	isType.equal<true, false, IsAny<never>>()
	isType.equal<true, false, IsAny<{}>>()
	isType.equal<true, false, IsAny<void>>()
	isType.equal<true, false, IsAny<PrimitiveTypes>>()
})

test('never is not any', () => {
	isType.equal<true, false, IsAny<never>>()
})

test('fake symbol return false as symbol is unique', () => {
	const s = Symbol.for('any')
	type S = typeof s
	isType.equal<true, false, IsAny<S>>()
})

it('can override Then/Else', () => {
	isType.equal<true, IsAny<any, 1, 2>, 1>()
	isType.equal<true, IsAny<never, 1, 2>, 2>()
})
