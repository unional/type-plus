import { type, type NotArrayType } from '../index.js'

it('returns never if T is array', () => {
	type.never<NotArrayType<string[]>>(true)
})

it('returns never if T is tuple', () => {
	type.equal<NotArrayType<[]>, []>(true)
	type.equal<NotArrayType<[1]>, [1]>(true)
})

it('returns never for special types', () => {
	type.equal<NotArrayType<void>, void>(true)
	type.equal<NotArrayType<unknown>, unknown>(true)
	type.equal<NotArrayType<any>, any>(true)
	type.equal<NotArrayType<never>, never>(true)
})
it('returns never for all other types', () => {
	type.equal<NotArrayType<undefined>, undefined>(true)
	type.equal<NotArrayType<null>, null>(true)
	type.equal<NotArrayType<boolean>, boolean>(true)
	type.equal<NotArrayType<true>, true>(true)
	type.equal<NotArrayType<false>, false>(true)
	type.equal<NotArrayType<number>, number>(true)
	type.equal<NotArrayType<1>, 1>(true)
	type.equal<NotArrayType<string>, string>(true)
	type.equal<NotArrayType<''>, ''>(true)
	type.equal<NotArrayType<symbol>, symbol>(true)
	type.equal<NotArrayType<bigint>, bigint>(true)
	type.equal<NotArrayType<{}>, {}>(true)
	type.equal<NotArrayType<[]>, []>(true)
	type.equal<NotArrayType<Function>, Function>(true)
	type.equal<NotArrayType<() => void>, () => void>(true)
})

it('can override Then/Else', () => {
	type.equal<NotArrayType<string[], 1, 2>, 2>(true)
	type.equal<NotArrayType<[], 1, 2>, 1>(true)

	type.equal<NotArrayType<any, 1, 2>, 1>(true)
	type.equal<NotArrayType<unknown, 1, 2>, 1>(true)
	type.equal<NotArrayType<never, 1, 2>, 1>(true)
	type.equal<NotArrayType<void, 1, 2>, 1>(true)
})
