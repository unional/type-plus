import { drop, DropMatch, DropNull, DropNullable, DropUndefined, type } from '../index.js'

describe('DropMatch<A, C>', () => {
	describe('A is array', () => {
		test('drop all types gets never[]', () => {
			type A = DropMatch<Array<string>, string>
			type.equal<A, never[]>(true)

			type B = DropMatch<Array<string | boolean>, string | boolean>
			type.equal<B, never[]>(true)
		})

		test('drop undefined and null from array', () => {
			type A = DropMatch<Array<string | undefined>, undefined>
			type.equal<A, string[]>(true)

			type B = DropMatch<Array<string | number | undefined>, undefined>
			type.equal<B, Array<string | number>>(true)

			type C = DropMatch<Array<string | number | undefined | null>, undefined | null>
			type.equal<C, Array<string | number>>(true)
		})

		test('can get undefined and null array when other types dropped', () => {
			type A = DropMatch<Array<string | undefined>, string>
			type.equal<A, Array<undefined>>(true)

			type B = DropMatch<Array<string | number | null>, string>
			type.equal<B, Array<number | null>>(true)
		})

		test('unmatched criteria returns original', () => {
			type Actual = DropMatch<Array<string | undefined>, number>
			type.equal<Actual, Array<string | undefined>>(true)
		})

		test('drop all narrow types', () => {
			type A = DropMatch<Array<1 | 2 | 3>, number>
			type.equal<A, never[]>(true)

			type B = DropMatch<Array<1 | 2 | 3 | string>, number>
			type.equal<B, Array<string>>(true)
		})

		test('will not drop widen type', () => {
			type A = DropMatch<Array<number>, 1>
			type.equal<A, Array<number>>(true)

			type B = DropMatch<Array<string | 'foo'>, 'foo'>
			type.equal<B, Array<string>>(true)

			// C is currently `string[] | string[]` (TypeScript 4.6.2)
			// It does not collapse to `string[]`
			// type C = DropMatch<Array<string | 'foo'>, 'foo' | 'boo'>
			// Here `string[] | string[]` literal collapses to `string[]`
			// commenting this out as it will likely be improved in future versions of TypeScript
			// type.equal<string[] | string[], C>(true)
		})
	})

	describe('A is Tuple', () => {
		test('empty tuple', () => {
			type A = DropMatch<[], undefined>
			type.equal<A, []>(true)
		})

		test('drop undefined from tuple', () => {
			type A = DropMatch<[undefined], undefined>
			type.equal<A, []>(true)

			type B = DropMatch<[1, undefined], undefined>
			type.equal<B, [1]>(true)

			type C = DropMatch<[1, undefined, 3], undefined>
			type.equal<C, [1, 3]>(true)

			type D = DropMatch<[1, string | undefined, 3], undefined>
			type.equal<D, [1, string, 3]>(true)
		})

		test('drop undefined from readonly tuple', () => {
			type A = DropMatch<readonly [undefined], undefined>
			type.equal<[], A>(true)

			type B = DropMatch<[1, undefined], undefined>
			type.equal<[1], B>(true)

			type C = DropMatch<[1, undefined, 3], undefined>
			type.equal<[1, 3], C>(true)

			type D = DropMatch<[1, string | undefined, 3], undefined>
			type.equal<[1, string, 3], D>(true)
		})

		test('drop undefined keep null', () => {
			type A = DropMatch<[undefined | null], undefined>
			type.equal<[null], A>(true)
		})

		test('drop null keep undefined', () => {
			type A = DropMatch<[undefined | null], null>
			type.equal<[undefined], A>(true)
		})

		test('drop both null and undefined', () => {
			type A = DropMatch<[undefined | null], null | undefined>
			type.equal<[], A>(true)

			type B = DropMatch<[undefined | null | string], null | undefined>
			type.equal<[string], B>(true)
		})

		test('get original if not matched', () => {
			type A = DropMatch<[1], undefined>
			type.equal<[1], A>(true)

			type B = DropMatch<[1], undefined | string>
			type.equal<[1], B>(true)

			type C = DropMatch<[1, 2, 3, 4], 5>
			type.equal<[1, 2, 3, 4], C>(true)
		})

		test('drop narrow type', () => {
			type C = DropMatch<[1], number>
			type.equal<[], C>(true)
		})

		test('keep widen type', () => {
			type D = DropMatch<[number], 1>
			type.equal<[number], D>(true)
		})

		test('drop type from tuple', () => {
			type A = DropMatch<[1], 1>
			type.equal<[], A>(true)

			type B = DropMatch<[number | string], number>
			type.equal<[string], B>(true)

			type C = DropMatch<[1, undefined, 3], 1>
			type.equal<[undefined, 3], C>(true)

			type D = DropMatch<[1, string | undefined, 3], 3>
			type.equal<[1, string | undefined], D>(true)
		})

		test('drop multiple types', () => {
			type Actual = DropMatch<[1, 2, 3, 4], 2 | 4>
			type.equal<[1, 3], Actual>(true)
		})

		test('drop undefined and null', () => {
			type Actual = DropMatch<[1, undefined, 3, null], undefined | null>
			type.equal<[1, 3], Actual>(true)
		})
	})
})

describe('DropUndefined<A>', () => {
	test('drop from array type', () => {
		type A = DropUndefined<Array<string | undefined>>
		type.equal<string[], A>(true)

		type B = DropUndefined<Array<string | number>>
		type.equal<Array<string | number>, B>(true)

		type C = DropUndefined<Array<string | number | undefined | null>>
		type.equal<Array<string | number | null>, C>(true)
	})

	test('drop from tuple type', () => {
		type A = DropUndefined<[string, undefined, number, null]>
		type.equal<[string, number, null], A>(true)
	})
})

describe('DropNull<A>', () => {
	test('drop from array type', () => {
		type A = DropNull<Array<string | null>>
		type.equal<string[], A>(true)

		type B = DropNull<Array<string | number>>
		type.equal<Array<string | number>, B>(true)

		type C = DropNull<Array<string | number | undefined | null>>
		type.equal<Array<string | number | undefined>, C>(true)
	})

	test('drop from tuple type', () => {
		type A = DropNull<[string, undefined, number, null]>
		type.equal<[string, undefined, number], A>(true)
	})
})

describe('DropNullable<A>', () => {
	test('drop from array type', () => {
		type A = DropNullable<Array<string | null>>
		type.equal<string[], A>(true)

		type B = DropNullable<Array<string | number>>
		type.equal<Array<string | number>, B>(true)

		type C = DropNullable<Array<string | number | undefined | null>>
		type.equal<Array<string | number>, C>(true)
	})

	test('drop from tuple type', () => {
		type A = DropNullable<[string, undefined, number, null]>
		type.equal<[string, number], A>(true)
	})
})

describe('drop()', () => {
	test('array', () => {
		const a = drop([1, 'a', 3, 4], 'a')
		expect(a).toEqual([1, 3, 4])
		type.equal<number[], typeof a>(true)
	})
	test('tuple', () => {
		const a = drop([1, 2, 3, 4] as const, 1 as const)
		expect(a).toEqual([2, 3, 4])
		type.equal<[2, 3, 4], typeof a>(true)
	})

	test('drop undefined from tuple', () => {
		const a = drop([1, undefined, 3, undefined, 4] as const, undefined)
		expect(a).toEqual([1, 3, 4])
		type.equal<[1, 3, 4], typeof a>(true)
	})
})
