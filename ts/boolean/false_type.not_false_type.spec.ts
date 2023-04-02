import { testType, type NotFalseType } from '../index.js'

it('returns never it T is false', () => {
	testType.never<NotFalseType<false>>(true)
})

it('returns T if T is boolean or true', () => {
	testType.equal<NotFalseType<boolean>, boolean>(true)
	testType.equal<NotFalseType<true>, true>(true)
})

it('returns T for special types', () => {
	testType.equal<NotFalseType<void>, void>(true)
	testType.equal<NotFalseType<unknown>, unknown>(true)
	testType.equal<NotFalseType<any>, any>(true)
	testType.equal<NotFalseType<never>, never>(true)
})

it('returns T for other types', () => {
	testType.equal<NotFalseType<undefined>, undefined>(true)
	testType.equal<NotFalseType<null>, null>(true)
	testType.equal<NotFalseType<number>, number>(true)
	testType.equal<NotFalseType<boolean>, boolean>(true)
	testType.equal<NotFalseType<true>, true>(true)
	testType.equal<NotFalseType<string>, string>(true)
	testType.equal<NotFalseType<''>, ''>(true)
	testType.equal<NotFalseType<symbol>, symbol>(true)
	testType.equal<NotFalseType<bigint>, bigint>(true)
	testType.equal<NotFalseType<1n>, 1n>(true)
	testType.equal<NotFalseType<{}>, {}>(true)
	testType.equal<NotFalseType<{ a: 1 }>, { a: 1 }>(true)
	testType.equal<NotFalseType<string[]>, string[]>(true)
	testType.equal<NotFalseType<[]>, []>(true)
	testType.equal<NotFalseType<Function>, Function>(true)
	testType.equal<NotFalseType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotFalseType<false | 1>, false | 1>(true)
	testType.equal<NotFalseType<false | boolean>, boolean>(true)
})

it('returns T for intersection type', () => {
	testType.equal<NotFalseType<false & { a: 1 }>, false & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotFalseType<false, 1, 2>, 2>(true)
	testType.equal<NotFalseType<0, 1, 2>, 1>(true)

	testType.equal<NotFalseType<any, 1, 2>, 1>(true)
	testType.equal<NotFalseType<unknown, 1, 2>, 1>(true)
	testType.equal<NotFalseType<never, 1, 2>, 1>(true)
	testType.equal<NotFalseType<void, 1, 2>, 1>(true)
})
