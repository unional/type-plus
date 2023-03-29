import { type, type NotStrictStringType } from '../index.js'

it('returns never if T is string', () => {
	type.never<NotStrictStringType<string>>(true)
})

it('returns T if T is a string literal', () => {
	type.equal<NotStrictStringType<''>, ''>(true)
	type.equal<NotStrictStringType<'a'>, 'a'>(true)
})

it('returns T for special types', () => {
	type.equal<NotStrictStringType<any>, any>(true)
	type.equal<NotStrictStringType<unknown>, unknown>(true)
	type.equal<NotStrictStringType<void>, void>(true)
	type.equal<NotStrictStringType<never>, never>(true)
})

it('returns T for other types', () => {
	type.equal<NotStrictStringType<undefined>, undefined>(true)
	type.equal<NotStrictStringType<null>, null>(true)
	type.equal<NotStrictStringType<boolean>, boolean>(true)
	type.equal<NotStrictStringType<true>, true>(true)
	type.equal<NotStrictStringType<false>, false>(true)
	type.equal<NotStrictStringType<number>, number>(true)
	type.equal<NotStrictStringType<1>, 1>(true)
	type.equal<NotStrictStringType<symbol>, symbol>(true)
	type.equal<NotStrictStringType<bigint>, bigint>(true)
	type.equal<NotStrictStringType<{}>, {}>(true)
	type.equal<NotStrictStringType<string[]>, string[]>(true)
	type.equal<NotStrictStringType<[]>, []>(true)
	type.equal<NotStrictStringType<Function>, Function>(true)
	type.equal<NotStrictStringType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotStrictStringType<string | 1>, string | 1>(true)
})

it('can override Then/Else', () => {
	type.equal<NotStrictStringType<string, 1, 2>, 2>(true)
	type.equal<NotStrictStringType<'', 1, 2>, 1>(true)
	type.equal<NotStrictStringType<'a', 1, 2>, 1>(true)

	type.equal<NotStrictStringType<any, 1, 2>, 1>(true)
	type.equal<NotStrictStringType<unknown, 1, 2>, 1>(true)
	type.equal<NotStrictStringType<never, 1, 2>, 1>(true)
	type.equal<NotStrictStringType<void, 1, 2>, 1>(true)
})
