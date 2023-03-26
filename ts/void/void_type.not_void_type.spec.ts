import { type, type NotVoidType } from '../index.js'

it('returns never for void', () => {
	type.never<NotVoidType<void>>(true)
})

it('returns never for other special types', () => {
	type.equal<NotVoidType<any>, any>(true)
	type.equal<NotVoidType<unknown>, unknown>(true)
	type.equal<NotVoidType<never>, never>(true)
})

test('returns never for singular types', () => {
	type.equal<NotVoidType<undefined>, undefined>(true)
	type.equal<NotVoidType<null>, null>(true)
	type.equal<NotVoidType<number>, number>(true)
	type.equal<NotVoidType<boolean>, boolean>(true)
	type.equal<NotVoidType<true>, true>(true)
	type.equal<NotVoidType<false>, false>(true)
	type.equal<NotVoidType<string>, string>(true)
	type.equal<NotVoidType<''>, ''>(true)
	type.equal<NotVoidType<symbol>, symbol>(true)
	type.equal<NotVoidType<bigint>, bigint>(true)
	type.equal<NotVoidType<{}>, {}>(true)
	type.equal<NotVoidType<string[]>, string[]>(true)
	type.equal<NotVoidType<[]>, []>(true)
	type.equal<NotVoidType<Function>, Function>(true)
	type.equal<NotVoidType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotVoidType<void | 1>, void | 1>(true)
})

it('returns never for intersection type', () => {
	type.never<NotVoidType<void & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	type.equal<NotVoidType<void, 1, 2>, 2>(true)
	type.equal<NotVoidType<0, 1, 2>, 1>(true)

	type.equal<NotVoidType<any, 1, 2>, 1>(true)
	type.equal<NotVoidType<unknown, 1, 2>, 1>(true)
	type.equal<NotVoidType<never, 1, 2>, 1>(true)
})
