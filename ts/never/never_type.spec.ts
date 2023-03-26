import { type, type NeverType, type Not_Never, type PrimitiveTypes, type Is_Never } from '../index.js'

it('returns never for never', () => {
	type.equal<NeverType<never>, never>(true)
})

it('returns never for other special types', () => {
	type.equal<NeverType<unknown>, Not_Never>(true)
	type.equal<NeverType<void>, Not_Never>(true)
	type.equal<NeverType<any>, Not_Never>(true)
})

test('returns never for singular types', () => {
	type.equal<NeverType<undefined>, Not_Never>(true)
	type.equal<NeverType<null>, Not_Never>(true)
	type.equal<NeverType<number>, Not_Never>(true)
	type.equal<NeverType<boolean>, Not_Never>(true)
	type.equal<NeverType<true>, Not_Never>(true)
	type.equal<NeverType<false>, Not_Never>(true)
	type.equal<NeverType<string>, Not_Never>(true)
	type.equal<NeverType<''>, Not_Never>(true)
	type.equal<NeverType<symbol>, Not_Never>(true)
	type.equal<NeverType<bigint>, Not_Never>(true)
	type.equal<NeverType<{}>, Not_Never>(true)
	type.equal<NeverType<string[]>, Not_Never>(true)
	type.equal<NeverType<[]>, Not_Never>(true)
	type.equal<NeverType<Function>, Not_Never>(true)
	type.equal<NeverType<() => void>, Not_Never>(true)
})

it('returns never for union type', () => {
	type.equal<NeverType<PrimitiveTypes>, Not_Never>(true)
})

it('returns never for intersection type', () => {
	type.equal<NeverType<{} & {}>, Not_Never>(true)
})

it('can override Then/Else', () => {
	type.equal<NeverType<any, 1, 2>, 2>(true)
	type.equal<NeverType<unknown, 1, 2>, 2>(true)
	type.equal<NeverType<never, 1, 2>, 1>(true)
	type.equal<NeverType<void, 1, 2>, 2>(true)
})

it('Is_Never and Not_Never is not the same', () => {
	type.equal<Is_Never, Not_Never>(false)
})
