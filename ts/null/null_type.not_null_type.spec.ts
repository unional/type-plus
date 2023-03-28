import { type, type NotNullType } from '../index.js'

it('returns never if T is null', () => {
	type.never<NotNullType<null>>(true)
})

it('returns T for special types', () => {
	type.equal<NotNullType<any>, any>(true)
	type.equal<NotNullType<unknown>, unknown>(true)
	type.equal<NotNullType<void>, void>(true)
	type.equal<NotNullType<never>, never>(true)
})

test('returns T for other types', () => {
	type.equal<NotNullType<undefined>, undefined>(true)
	type.equal<NotNullType<boolean>, boolean>(true)
	type.equal<NotNullType<true>, true>(true)
	type.equal<NotNullType<false>, false>(true)
	type.equal<NotNullType<number>, number>(true)
	type.equal<NotNullType<1>, 1>(true)
	type.equal<NotNullType<string>, string>(true)
	type.equal<NotNullType<''>, ''>(true)
	type.equal<NotNullType<symbol>, symbol>(true)
	type.equal<NotNullType<bigint>, bigint>(true)
	type.equal<NotNullType<{}>, {}>(true)
	type.equal<NotNullType<string[]>, string[]>(true)
	type.equal<NotNullType<[]>, []>(true)
	type.equal<NotNullType<Function>, Function>(true)
	type.equal<NotNullType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotNullType<null | 1>, null | 1>(true)
})

it('can override Then/Else', () => {
	type.equal<NotNullType<null, 1, 2>, 2>(true)

	type.equal<NotNullType<any, 1, 2>, 1>(true)
	type.equal<NotNullType<unknown, 1, 2>, 1>(true)
	type.equal<NotNullType<never, 1, 2>, 1>(true)
	type.equal<NotNullType<void, 1, 2>, 1>(true)
})
