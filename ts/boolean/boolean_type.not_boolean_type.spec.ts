import { testType, type NotBooleanType } from '../index.js'

it('returns never it T is toolean', () => {
	testType.never<NotBooleanType<boolean>>(true)
})

it('returns never it T is true or false literal', () => {
	testType.never<NotBooleanType<true>>(true)
	testType.never<NotBooleanType<false>>(true)
})

it('returns T for special types', () => {
	testType.equal<NotBooleanType<void>, void>(true)
	testType.equal<NotBooleanType<unknown>, unknown>(true)
	testType.equal<NotBooleanType<any>, any>(true)
	testType.equal<NotBooleanType<never>, never>(true)
})

it('returns T for all other types', () => {
	testType.equal<NotBooleanType<undefined>, undefined>(true)
	testType.equal<NotBooleanType<null>, null>(true)
	testType.equal<NotBooleanType<number>, number>(true)
	testType.equal<NotBooleanType<string>, string>(true)
	testType.equal<NotBooleanType<''>, ''>(true)
	testType.equal<NotBooleanType<symbol>, symbol>(true)
	testType.equal<NotBooleanType<bigint>, bigint>(true)
	testType.equal<NotBooleanType<1n>, 1n>(true)
	testType.equal<NotBooleanType<{}>, {}>(true)
	testType.equal<NotBooleanType<{ a: 1 }>, { a: 1 }>(true)
	testType.equal<NotBooleanType<string[]>, string[]>(true)
	testType.equal<NotBooleanType<[]>, []>(true)
	testType.equal<NotBooleanType<Function>, Function>(true)
	testType.equal<NotBooleanType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotBooleanType<boolean | 1>, boolean | 1>(true)
})

it('returns never for intersection type', () => {
	testType.never<NotBooleanType<boolean & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotBooleanType<boolean, 1, 2>, 2>(true)
	testType.equal<NotBooleanType<true, 1, 2>, 2>(true)
	testType.equal<NotBooleanType<false, 1, 2>, 2>(true)

	testType.equal<NotBooleanType<any, 1, 2>, 1>(true)
	testType.equal<NotBooleanType<unknown, 1, 2>, 1>(true)
	testType.equal<NotBooleanType<never, 1, 2>, 1>(true)
	testType.equal<NotBooleanType<void, 1, 2>, 1>(true)
})
