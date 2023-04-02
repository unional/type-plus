import { testType, type NotStringType } from '../index.js'

it('returns never if T is string', () => {
	testType.never<NotStringType<string>>(true)
})

it('returns never if T is a string literal', () => {
	testType.equal<NotStringType<''>, never>(true)
	testType.equal<NotStringType<'a'>, never>(true)
})

it('returns T for special types', () => {
	testType.equal<NotStringType<any>, any>(true)
	testType.equal<NotStringType<unknown>, unknown>(true)
	testType.equal<NotStringType<void>, void>(true)
	testType.equal<NotStringType<never>, never>(true)
})

it('returns T for other types', () => {
	testType.equal<NotStringType<undefined>, undefined>(true)
	testType.equal<NotStringType<null>, null>(true)
	testType.equal<NotStringType<boolean>, boolean>(true)
	testType.equal<NotStringType<true>, true>(true)
	testType.equal<NotStringType<false>, false>(true)
	testType.equal<NotStringType<number>, number>(true)
	testType.equal<NotStringType<1>, 1>(true)
	testType.equal<NotStringType<symbol>, symbol>(true)
	testType.equal<NotStringType<bigint>, bigint>(true)
	testType.equal<NotStringType<{}>, {}>(true)
	testType.equal<NotStringType<string[]>, string[]>(true)
	testType.equal<NotStringType<[]>, []>(true)
	testType.equal<NotStringType<Function>, Function>(true)
	testType.equal<NotStringType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	testType.equal<NotStringType<string | 1>, string | 1>(true)
})

it('returns never for intersection type', () => {
	testType.equal<NotStringType<string & { a: 1 }>, never>(true)
})

it('can override Then/Else', () => {
	testType.equal<NotStringType<string, 1, 2>, 2>(true)
	testType.equal<NotStringType<'', 1, 2>, 2>(true)
	testType.equal<NotStringType<'a', 1, 2>, 2>(true)

	testType.equal<NotStringType<any, 1, 2>, 1>(true)
	testType.equal<NotStringType<unknown, 1, 2>, 1>(true)
	testType.equal<NotStringType<never, 1, 2>, 1>(true)
	testType.equal<NotStringType<void, 1, 2>, 1>(true)
})
