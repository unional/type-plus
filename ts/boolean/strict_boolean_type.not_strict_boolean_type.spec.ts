import { type, type NotStrictBooleanType } from '../index.js'

it('returns never it T is toolean', () => {
	type.never<NotStrictBooleanType<boolean>>(true)
})

it('returns T it T is true or false literal', () => {
	type.equal<NotStrictBooleanType<true>, true>(true)
	type.equal<NotStrictBooleanType<false>, false>(true)
})

it('returns T for special types', () => {
	type.equal<NotStrictBooleanType<void>, void>(true)
	type.equal<NotStrictBooleanType<unknown>, unknown>(true)
	type.equal<NotStrictBooleanType<any>, any>(true)
	type.equal<NotStrictBooleanType<never>, never>(true)
})

it('returns T for all other types', () => {
	type.equal<NotStrictBooleanType<undefined>, undefined>(true)
	type.equal<NotStrictBooleanType<null>, null>(true)
	type.equal<NotStrictBooleanType<number>, number>(true)
	type.equal<NotStrictBooleanType<true>, true>(true)
	type.equal<NotStrictBooleanType<false>, false>(true)
	type.equal<NotStrictBooleanType<string>, string>(true)
	type.equal<NotStrictBooleanType<''>, ''>(true)
	type.equal<NotStrictBooleanType<symbol>, symbol>(true)
	type.equal<NotStrictBooleanType<bigint>, bigint>(true)
	type.equal<NotStrictBooleanType<{}>, {}>(true)
	type.equal<NotStrictBooleanType<string[]>, string[]>(true)
	type.equal<NotStrictBooleanType<[]>, []>(true)
	type.equal<NotStrictBooleanType<Function>, Function>(true)
	type.equal<NotStrictBooleanType<() => void>, () => void>(true)
})

it('returns T for union type', () => {
	type.equal<NotStrictBooleanType<boolean | 1>, boolean | 1>(true)
})

it('returns T for intersection type', () => {
	type.equal<NotStrictBooleanType<boolean & { a: 1 }>, boolean & { a: 1 }>(true)
})

it('can override Then/Else', () => {
	type.equal<NotStrictBooleanType<boolean, 1, 2>, 2>(true)
	type.equal<NotStrictBooleanType<true, 1, 2>, 1>(true)
	type.equal<NotStrictBooleanType<false, 1, 2>, 1>(true)

	type.equal<NotStrictBooleanType<any, 1, 2>, 1>(true)
	type.equal<NotStrictBooleanType<unknown, 1, 2>, 1>(true)
	type.equal<NotStrictBooleanType<never, 1, 2>, 1>(true)
	type.equal<NotStrictBooleanType<void, 1, 2>, 1>(true)
})
