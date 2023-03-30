import { type, type NotStrictBigintType } from '../index.js'

it('returns never if T is bigint', () => {
	type.never<NotStrictBigintType<bigint>>(true)
})

it('returns T if T is bigint literals', () => {
	type.equal<NotStrictBigintType<0n>, 0n>(true)
	type.equal<NotStrictBigintType<11111111111111111111111111111111n>, 11111111111111111111111111111111n>(true)
})

it('returns T for special types', () => {
	type.equal<NotStrictBigintType<any>, any>(true)
	type.equal<NotStrictBigintType<unknown>, unknown>(true)
	type.equal<NotStrictBigintType<void>, void>(true)
	type.equal<NotStrictBigintType<never>, never>(true)
})

test('returns T for other types', () => {
	type.equal<NotStrictBigintType<undefined>, undefined>(true)
	type.equal<NotStrictBigintType<null>, null>(true)
	type.equal<NotStrictBigintType<boolean>, boolean>(true)
	type.equal<NotStrictBigintType<true>, true>(true)
	type.equal<NotStrictBigintType<false>, false>(true)
	type.equal<NotStrictBigintType<number>, number>(true)
	type.equal<NotStrictBigintType<1>, 1>(true)
	type.equal<NotStrictBigintType<string>, string>(true)
	type.equal<NotStrictBigintType<''>, ''>(true)
	type.equal<NotStrictBigintType<symbol>, symbol>(true)
	type.equal<NotStrictBigintType<{}>, {}>(true)
	type.equal<NotStrictBigintType<string[]>, string[]>(true)
	type.equal<NotStrictBigintType<[]>, []>(true)
	type.equal<NotStrictBigintType<Function>, Function>(true)
	type.equal<NotStrictBigintType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotStrictBigintType<bigint | 1>, bigint | 1>(true)
	type.equal<NotStrictBigintType<bigint | 'a'>, bigint | 'a'>(true)
})

it('returns T for intersection type', () => {
	type.equal<NotStrictBigintType<bigint & { a: 1 }>, bigint & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	type.equal<NotStrictBigintType<bigint, 1, 2>, 2>(true)
	type.equal<NotStrictBigintType<0n, 1, 2>, 1>(true)

	type.equal<NotStrictBigintType<any, 1, 2>, 1>(true)
	type.equal<NotStrictBigintType<unknown, 1, 2>, 1>(true)
	type.equal<NotStrictBigintType<never, 1, 2>, 1>(true)
	type.equal<NotStrictBigintType<void, 1, 2>, 1>(true)
})
