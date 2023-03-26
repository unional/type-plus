import { type, type NotAnyType } from '../index.js'

it('returns never for any', () => {
	type.never<NotAnyType<any>>(true)
})

it('returns T for other special types', () => {
	type.equal<NotAnyType<unknown>, unknown>(true)
	type.equal<NotAnyType<void>, void>(true)
	type.equal<NotAnyType<never>, never>(true)
})

test('returns T for other types', () => {
	type.equal<NotAnyType<undefined>, undefined>(true)
	type.equal<NotAnyType<null>, null>(true)
	type.equal<NotAnyType<boolean>, boolean>(true)
	type.equal<NotAnyType<true>, true>(true)
	type.equal<NotAnyType<false>, false>(true)
	type.equal<NotAnyType<number>, number>(true)
	type.equal<NotAnyType<1>, 1>(true)
	type.equal<NotAnyType<string>, string>(true)
	type.equal<NotAnyType<''>, ''>(true)
	type.equal<NotAnyType<symbol>, symbol>(true)
	type.equal<NotAnyType<bigint>, bigint>(true)
	type.equal<NotAnyType<1n>, 1n>(true)
	type.equal<NotAnyType<{}>, {}>(true)
	type.equal<NotAnyType<{ a: 1 }>, { a: 1 }>(true)
	type.equal<NotAnyType<string[]>, string[]>(true)
	type.equal<NotAnyType<[]>, []>(true)
	type.equal<NotAnyType<Function>, Function>(true)
	type.equal<NotAnyType<() => void>, () => void>(true)
})

it('returns never for union type', () => {
	type.equal<NotAnyType<any | 1>, never>(true)
})

it('returns never for intersection type', () => {
	type.equal<NotAnyType<any & 1>, never>(true)
})

it('can override Then/Else', () => {
	type.equal<NotAnyType<any, 1, 2>, 2>(true)
	type.equal<NotAnyType<0, 1, 2>, 1>(true)

	type.equal<NotAnyType<never, 1, 2>, 1>(true)
	type.equal<NotAnyType<unknown, 1, 2>, 1>(true)
	type.equal<NotAnyType<void, 1, 2>, 1>(true)
})
