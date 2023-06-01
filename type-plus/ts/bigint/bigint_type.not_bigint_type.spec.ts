import { it } from '@jest/globals'
import { testType, type NotBigintType } from '../index.js'

it('returns never if T is bigint', () => {
	testType.never<NotBigintType<bigint>>(true)
})

it('returns never if T is bigint literals', () => {
	testType.equal<NotBigintType<0n>, never>(true)
	testType.equal<NotBigintType<11111111111111111111111111111111n>, never>(true)
})

it('returns T for special types', () => {
	testType.equal<NotBigintType<any>, any>(true)
	testType.equal<NotBigintType<unknown>, unknown>(true)
	testType.equal<NotBigintType<void>, void>(true)
	testType.equal<NotBigintType<never>, never>(true)
})

it('returns T for other types', () => {
	testType.equal<NotBigintType<undefined>, undefined>(true)
	testType.equal<NotBigintType<null>, null>(true)
	testType.equal<NotBigintType<boolean>, boolean>(true)
	testType.equal<NotBigintType<true>, true>(true)
	testType.equal<NotBigintType<false>, false>(true)
	testType.equal<NotBigintType<number>, number>(true)
	testType.equal<NotBigintType<1>, 1>(true)
	testType.equal<NotBigintType<string>, string>(true)
	testType.equal<NotBigintType<''>, ''>(true)
	testType.equal<NotBigintType<symbol>, symbol>(true)
	testType.equal<NotBigintType<{}>, {}>(true)
	testType.equal<NotBigintType<string[]>, string[]>(true)
	testType.equal<NotBigintType<[]>, []>(true)
	testType.equal<NotBigintType<Function>, Function>(true)
	testType.equal<NotBigintType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotBigintType<bigint | 1>, bigint | 1>(true)
	testType.equal<NotBigintType<bigint | 'a'>, bigint | 'a'>(true)
})

it('returns never for intersection type', () => {
	testType.equal<NotBigintType<bigint & { a: 1 }>, never>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotBigintType<bigint, 1, 2>, 2>(true)
	testType.equal<NotBigintType<0n, 1, 2>, 2>(true)

	testType.equal<NotBigintType<any, 1, 2>, 1>(true)
	testType.equal<NotBigintType<unknown, 1, 2>, 1>(true)
	testType.equal<NotBigintType<never, 1, 2>, 1>(true)
	testType.equal<NotBigintType<void, 1, 2>, 1>(true)
})
