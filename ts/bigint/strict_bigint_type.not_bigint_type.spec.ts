import { testType, type NotStrictBigintType } from '../index.js'

it('returns never if T is bigint', () => {
	testType.never<NotStrictBigintType<bigint>>(true)
})

it('returns T if T is bigint literals', () => {
	testType.equal<NotStrictBigintType<0n>, 0n>(true)
	testType.equal<NotStrictBigintType<11111111111111111111111111111111n>, 11111111111111111111111111111111n>(true)
})

it('returns T for special types', () => {
	testType.equal<NotStrictBigintType<any>, any>(true)
	testType.equal<NotStrictBigintType<unknown>, unknown>(true)
	testType.equal<NotStrictBigintType<void>, void>(true)
	testType.equal<NotStrictBigintType<never>, never>(true)
})

test('returns T for other types', () => {
	testType.equal<NotStrictBigintType<undefined>, undefined>(true)
	testType.equal<NotStrictBigintType<null>, null>(true)
	testType.equal<NotStrictBigintType<boolean>, boolean>(true)
	testType.equal<NotStrictBigintType<true>, true>(true)
	testType.equal<NotStrictBigintType<false>, false>(true)
	testType.equal<NotStrictBigintType<number>, number>(true)
	testType.equal<NotStrictBigintType<1>, 1>(true)
	testType.equal<NotStrictBigintType<string>, string>(true)
	testType.equal<NotStrictBigintType<''>, ''>(true)
	testType.equal<NotStrictBigintType<symbol>, symbol>(true)
	testType.equal<NotStrictBigintType<{}>, {}>(true)
	testType.equal<NotStrictBigintType<string[]>, string[]>(true)
	testType.equal<NotStrictBigintType<[]>, []>(true)
	testType.equal<NotStrictBigintType<Function>, Function>(true)
	testType.equal<NotStrictBigintType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotStrictBigintType<bigint | 1>, bigint | 1>(true)
	testType.equal<NotStrictBigintType<bigint | 'a'>, bigint | 'a'>(true)
})

it('returns T for intersection type', () => {
	testType.equal<NotStrictBigintType<bigint & { a: 1 }>, bigint & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotStrictBigintType<bigint, 1, 2>, 2>(true)
	testType.equal<NotStrictBigintType<0n, 1, 2>, 1>(true)

	testType.equal<NotStrictBigintType<any, 1, 2>, 1>(true)
	testType.equal<NotStrictBigintType<unknown, 1, 2>, 1>(true)
	testType.equal<NotStrictBigintType<never, 1, 2>, 1>(true)
	testType.equal<NotStrictBigintType<void, 1, 2>, 1>(true)
})
