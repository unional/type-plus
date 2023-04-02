import { testType, type NotStrictBooleanType } from '../index.js'

it('returns never it T is toolean', () => {
	testType.never<NotStrictBooleanType<boolean>>(true)
})

it('returns T it T is true or false literal', () => {
	testType.equal<NotStrictBooleanType<true>, true>(true)
	testType.equal<NotStrictBooleanType<false>, false>(true)
})

it('returns T for special types', () => {
	testType.equal<NotStrictBooleanType<void>, void>(true)
	testType.equal<NotStrictBooleanType<unknown>, unknown>(true)
	testType.equal<NotStrictBooleanType<any>, any>(true)
	testType.equal<NotStrictBooleanType<never>, never>(true)
})

it('returns T for all other types', () => {
	testType.equal<NotStrictBooleanType<undefined>, undefined>(true)
	testType.equal<NotStrictBooleanType<null>, null>(true)
	testType.equal<NotStrictBooleanType<number>, number>(true)
	testType.equal<NotStrictBooleanType<string>, string>(true)
	testType.equal<NotStrictBooleanType<''>, ''>(true)
	testType.equal<NotStrictBooleanType<symbol>, symbol>(true)
	testType.equal<NotStrictBooleanType<bigint>, bigint>(true)
	testType.equal<NotStrictBooleanType<1n>, 1n>(true)
	testType.equal<NotStrictBooleanType<{}>, {}>(true)
	testType.equal<NotStrictBooleanType<{ a: 1 }>, { a: 1 }>(true)
	testType.equal<NotStrictBooleanType<string[]>, string[]>(true)
	testType.equal<NotStrictBooleanType<[]>, []>(true)
	testType.equal<NotStrictBooleanType<Function>, Function>(true)
	testType.equal<NotStrictBooleanType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotStrictBooleanType<boolean | 1>, boolean | 1>(true)
})

it('returns T for intersection type', () => {
	testType.equal<NotStrictBooleanType<boolean & { a: 1 }>, boolean & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotStrictBooleanType<boolean, 1, 2>, 2>(true)
	testType.equal<NotStrictBooleanType<true, 1, 2>, 1>(true)
	testType.equal<NotStrictBooleanType<false, 1, 2>, 1>(true)

	testType.equal<NotStrictBooleanType<any, 1, 2>, 1>(true)
	testType.equal<NotStrictBooleanType<unknown, 1, 2>, 1>(true)
	testType.equal<NotStrictBooleanType<never, 1, 2>, 1>(true)
	testType.equal<NotStrictBooleanType<void, 1, 2>, 1>(true)
})
