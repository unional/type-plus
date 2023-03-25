import { ObjectType, isType } from '../index.js'

it('detects empty object', () => {
	isType.equal<true, {}, ObjectType<{}>>()
})

it('detects object type', () => {
	isType.equal<true, object, ObjectType<object>>()
})

it('detects object literal', () => {
	isType.equal<true, { a: 1 }, ObjectType<{ a: 1 }>>()
})

it('consider function is a subtype of object', () => {
	isType.equal<true, Function, ObjectType<Function>>()
	isType.equal<true, () => void, ObjectType<() => void>>()
})

it('detects non object', () => {
	isType.never<ObjectType<undefined>>()
	isType.never<ObjectType<null>>()
	isType.never<ObjectType<void>>()
	isType.never<ObjectType<unknown>>()
	isType.never<ObjectType<boolean>>()
	isType.never<ObjectType<true>>()
	isType.never<ObjectType<false>>()
	isType.never<ObjectType<number>>()
	isType.never<ObjectType<1>>()
	isType.never<ObjectType<string>>()
	isType.never<ObjectType<''>>()
	isType.never<ObjectType<'a'>>()
	isType.never<ObjectType<symbol>>()
	isType.never<ObjectType<bigint>>()
})

it('handles union', () => {
	isType.equal<true, { a: 1 } | 1, ObjectType<{ a: 1 } | 1>>()
})

it('handles intersection', () => {
	isType.equal<true, { a: 1 } & 1, ObjectType<{ a: 1 } & 1>>()
})

it('handles conditional', () => {
	isType.equal<
		true,
		{ a: 1 } extends { a: 1 } ? { a: 1 } : { a: 2 },
		ObjectType<{ a: 1 } extends { a: 1 } ? { a: 1 } : { a: 2 }>
	>()
})

it('handles array', () => {
	isType.equal<true, { a: 1 }[], ObjectType<{ a: 1 }[]>>()
})

it('handles tuple', () => {
	isType.equal<true, [1, 2], ObjectType<[1, 2]>>()
})

it('handles readonly', () => {
	isType.equal<true, readonly [1, 2], ObjectType<readonly [1, 2]>>()
})

it('handles mapped', () => {
	isType.equal<true, { [K in 'a']: 1 }, ObjectType<{ [K in 'a']: 1 }>>()
})

it('handles indexed', () => {
	isType.equal<true, { [K: string]: 1 }, ObjectType<{ [K: string]: 1 }>>()
})
