import { type, type NotTrueType, type PrimitiveTypes } from '../index.js'

it('returns never it T is true', () => {
	type.never<NotTrueType<true>>(true)
})

it('returns T if T is boolean or false', () => {
	type.equal<NotTrueType<boolean>, boolean>(true)
	type.equal<NotTrueType<false>, false>(true)
})

it('returns T for special types', () => {
	type.equal<NotTrueType<void>, void>(true)
	type.equal<NotTrueType<unknown>, unknown>(true)
	type.equal<NotTrueType<any>, any>(true)
	type.equal<NotTrueType<never>, never>(true)
})

it('returns T for all other types', () => {
	type.equal<NotTrueType<undefined>, undefined>(true)
	type.equal<NotTrueType<null>, null>(true)
	type.equal<NotTrueType<number>, number>(true)
	type.equal<NotTrueType<boolean>, boolean>(true)
	type.equal<NotTrueType<false>, false>(true)
	type.equal<NotTrueType<string>, string>(true)
	type.equal<NotTrueType<''>, ''>(true)
	type.equal<NotTrueType<symbol>, symbol>(true)
	type.equal<NotTrueType<bigint>, bigint>(true)
	type.equal<NotTrueType<{}>, {}>(true)
	type.equal<NotTrueType<string[]>, string[]>(true)
	type.equal<NotTrueType<[]>, []>(true)
	type.equal<NotTrueType<Function>, Function>(true)
	type.equal<NotTrueType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotTrueType<PrimitiveTypes>, PrimitiveTypes>(true)
})

it('can override Then/Else', () => {
	type.equal<NotTrueType<true, 1, 2>, 2>(true)

	type.equal<NotTrueType<any, 1, 2>, 1>(true)
	type.equal<NotTrueType<unknown, 1, 2>, 1>(true)
	type.equal<NotTrueType<never, 1, 2>, 1>(true)
	type.equal<NotTrueType<void, 1, 2>, 1>(true)
})
