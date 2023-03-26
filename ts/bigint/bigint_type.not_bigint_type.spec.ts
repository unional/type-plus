import { type, type NotBigintType } from '../index.js'

it('returns never if T is bigint', () => {
	type.never<NotBigintType<bigint>>(true)
})

it('returns T if T is bigint literals', () => {
	type.equal<NotBigintType<0n>, 0n>(true)
	type.equal<NotBigintType<11111111111111111111111111111111n>, 11111111111111111111111111111111n>(true)
})

it('returns T for special types', () => {
	type.equal<NotBigintType<any>, any>(true)
	type.equal<NotBigintType<unknown>, unknown>(true)
	type.equal<NotBigintType<void>, void>(true)
	type.equal<NotBigintType<never>, never>(true)
})

test('returns T for other types', () => {
	type.equal<NotBigintType<undefined>, undefined>(true)
	type.equal<NotBigintType<null>, null>(true)
	type.equal<NotBigintType<boolean>, boolean>(true)
	type.equal<NotBigintType<true>, true>(true)
	type.equal<NotBigintType<false>, false>(true)
	type.equal<NotBigintType<number>, number>(true)
	type.equal<NotBigintType<1>, 1>(true)
	type.equal<NotBigintType<string>, string>(true)
	type.equal<NotBigintType<''>, ''>(true)
	type.equal<NotBigintType<symbol>, symbol>(true)
	type.equal<NotBigintType<{}>, {}>(true)
	type.equal<NotBigintType<string[]>, string[]>(true)
	type.equal<NotBigintType<[]>, []>(true)
	type.equal<NotBigintType<Function>, Function>(true)
	type.equal<NotBigintType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotBigintType<bigint | 1>, bigint | 1>(true)
	type.equal<NotBigintType<bigint | 'a'>, bigint | 'a'>(true)
})

it('returns never for intersection type', () => {
	type.never<NotBigintType<bigint & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<NotBigintType<bigint, 1, 2>, 2>(true)
	type.equal<NotBigintType<0n, 1, 2>, 1>(true)

	type.equal<NotBigintType<any, 1, 2>, 1>(true)
	type.equal<NotBigintType<unknown, 1, 2>, 1>(true)
	type.equal<NotBigintType<never, 1, 2>, 1>(true)
	type.equal<NotBigintType<void, 1, 2>, 1>(true)
})
