import { type, type NotStringType } from '../index.js'

it('returns never if T is string', () => {
	type.never<NotStringType<string>>(true)
})

it('returns never if T is a string literal', () => {
	type.equal<NotStringType<''>, never>(true)
	type.equal<NotStringType<'a'>, never>(true)
})

it('returns T for special types', () => {
	type.equal<NotStringType<any>, any>(true)
	type.equal<NotStringType<unknown>, unknown>(true)
	type.equal<NotStringType<void>, void>(true)
	type.equal<NotStringType<never>, never>(true)
})

it('returns T for other types', () => {
	type.equal<NotStringType<undefined>, undefined>(true)
	type.equal<NotStringType<null>, null>(true)
	type.equal<NotStringType<boolean>, boolean>(true)
	type.equal<NotStringType<true>, true>(true)
	type.equal<NotStringType<false>, false>(true)
	type.equal<NotStringType<number>, number>(true)
	type.equal<NotStringType<1>, 1>(true)
	type.equal<NotStringType<symbol>, symbol>(true)
	type.equal<NotStringType<bigint>, bigint>(true)
	type.equal<NotStringType<{}>, {}>(true)
	type.equal<NotStringType<string[]>, string[]>(true)
	type.equal<NotStringType<[]>, []>(true)
	type.equal<NotStringType<Function>, Function>(true)
	type.equal<NotStringType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotStringType<string | 1>, string | 1>(true)
})

it('can override Then/Else', () => {
	type.equal<NotStringType<string, 1, 2>, 2>(true)
	type.equal<NotStringType<'', 1, 2>, 2>(true)
	type.equal<NotStringType<'a', 1, 2>, 2>(true)

	type.equal<NotStringType<any, 1, 2>, 1>(true)
	type.equal<NotStringType<unknown, 1, 2>, 1>(true)
	type.equal<NotStringType<never, 1, 2>, 1>(true)
	type.equal<NotStringType<void, 1, 2>, 1>(true)
})
