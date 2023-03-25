import { type, type NotUndefinedType, type PrimitiveTypes } from '../index.js'

it('returns never for undefined', () => {
	type.never<NotUndefinedType<undefined>>(true)
})

it('returns never for other special types', () => {
	type.equal<NotUndefinedType<any>, any>(true)
	type.equal<NotUndefinedType<unknown>, unknown>(true)
	type.equal<NotUndefinedType<void>, void>(true)
	type.equal<NotUndefinedType<never>, never>(true)
})

test('returns never for singular types', () => {
	type.equal<NotUndefinedType<null>, null>(true)
	type.equal<NotUndefinedType<number>, number>(true)
	type.equal<NotUndefinedType<boolean>, boolean>(true)
	type.equal<NotUndefinedType<true>, true>(true)
	type.equal<NotUndefinedType<false>, false>(true)
	type.equal<NotUndefinedType<string>, string>(true)
	type.equal<NotUndefinedType<''>, ''>(true)
	type.equal<NotUndefinedType<symbol>, symbol>(true)
	type.equal<NotUndefinedType<bigint>, bigint>(true)
	type.equal<NotUndefinedType<{}>, {}>(true)
	type.equal<NotUndefinedType<string[]>, string[]>(true)
	type.equal<NotUndefinedType<[]>, []>(true)
	type.equal<NotUndefinedType<Function>, Function>(true)
	type.equal<NotUndefinedType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotUndefinedType<PrimitiveTypes>, PrimitiveTypes>(true)
})

it('returns T for intersection type', () => {
	type.equal<NotUndefinedType<{} & {}>, {} & {}>(true)
})

it('can override Then/Else', () => {
	type.equal<NotUndefinedType<undefined, 1, 2>, 2>(true)
	type.equal<NotUndefinedType<any, 1, 2>, 1>(true)
	type.equal<NotUndefinedType<unknown, 1, 2>, 1>(true)
	type.equal<NotUndefinedType<never, 1, 2>, 1>(true)
	type.equal<NotUndefinedType<void, 1, 2>, 1>(true)
})
