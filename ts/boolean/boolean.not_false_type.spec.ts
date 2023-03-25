import { type, type NotFalseType, type PrimitiveTypes } from '../index.js'

it('returns never it T is false', () => {
	type.never<NotFalseType<false>>(true)
})

it('returns T if T is boolean or true', () => {
	type.equal<NotFalseType<boolean>, boolean>(true)
	type.equal<NotFalseType<true>, true>(true)
})

it('returns T for special types', () => {
	type.equal<NotFalseType<void>, void>(true)
	type.equal<NotFalseType<unknown>, unknown>(true)
	type.equal<NotFalseType<any>, any>(true)
	type.equal<NotFalseType<never>, never>(true)
})

it('returns T for all other types', () => {
	type.equal<NotFalseType<undefined>, undefined>(true)
	type.equal<NotFalseType<null>, null>(true)
	type.equal<NotFalseType<number>, number>(true)
	type.equal<NotFalseType<boolean>, boolean>(true)
	type.equal<NotFalseType<true>, true>(true)
	type.equal<NotFalseType<string>, string>(true)
	type.equal<NotFalseType<''>, ''>(true)
	type.equal<NotFalseType<symbol>, symbol>(true)
	type.equal<NotFalseType<bigint>, bigint>(true)
	type.equal<NotFalseType<{}>, {}>(true)
	type.equal<NotFalseType<string[]>, string[]>(true)
	type.equal<NotFalseType<[]>, []>(true)
	type.equal<NotFalseType<Function>, Function>(true)
	type.equal<NotFalseType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotFalseType<PrimitiveTypes>, PrimitiveTypes>(true)
})

it('can override Then/Else', () => {
	type.equal<NotFalseType<false, 1, 2>, 2>(true)

	type.equal<NotFalseType<any, 1, 2>, 1>(true)
	type.equal<NotFalseType<unknown, 1, 2>, 1>(true)
	type.equal<NotFalseType<never, 1, 2>, 1>(true)
	type.equal<NotFalseType<void, 1, 2>, 1>(true)
})
