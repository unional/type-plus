import { type, type NotArrayType } from '../index.js'

it('returns never if T is array', () => {
	type.never<NotArrayType<string[]>>(true)
})

it('returns T if T is tuple', () => {
	type.equal<NotArrayType<[]>, []>(true)
	type.equal<NotArrayType<[1]>, [1]>(true)
})

it('returns T for special types', () => {
	type.equal<NotArrayType<void>, void>(true)
	type.equal<NotArrayType<unknown>, unknown>(true)
	type.equal<NotArrayType<any>, any>(true)
	type.equal<NotArrayType<never>, never>(true)
})
it('returns T for other types', () => {
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
	type.equal<NotArrayType<1n>, 1n>(true)
	type.equal<NotArrayType<{}>, {}>(true)
	type.equal<NotArrayType<{ a: 1 }>, { a: 1 }>(true)
	type.equal<NotArrayType<[]>, []>(true)
	type.equal<NotArrayType<Function>, Function>(true)
	type.equal<NotArrayType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotArrayType<number[] | 1>, number[] | 1>(true)
})

it('returns T for intersection type', () => {
	type.equal<NotArrayType<number[] & 1>, number[] & 1>(true)
})

it('can override Then/Else', () => {
	type.equal<NotArrayType<string[], 1, 2>, 2>(true)
	type.equal<NotArrayType<[], 1, 2>, 1>(true)

	type.equal<NotArrayType<any, 1, 2>, 1>(true)
	type.equal<NotArrayType<unknown, 1, 2>, 1>(true)
	type.equal<NotArrayType<never, 1, 2>, 1>(true)
	type.equal<NotArrayType<void, 1, 2>, 1>(true)
})
