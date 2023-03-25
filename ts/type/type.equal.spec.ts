import { type } from '../index.js'

it('can be used with expected value', () => {
	type.equal<Omit<{ a: 1; b: 2 }, 'a'>, { b: 2 }>(true)

	// @ts-expect-error
	type.equal<Omit<{ a: 1; b: 2 }, 'a'>, { b: 2 }>(false)
})

it('returns value as type A for inspection', () => {
	// the actual value is meaningless as it is not passed in.
	// it is used to hold type `A` for inspection.
	const t = type.equal<Omit<{ a: 1; b: 2 }, 'a'>, { b: 2 }>(true)
	type RT = typeof t
	type.equal<{ b: 2 }, RT>(true)

	// @ts-expect-error
	const f = type.equal<Omit<{ a: 1; b: 2 }, 'a'>, { b: 2 }>(false)
	type RF = typeof f
	type.equal<{ b: 2 }, RF>(true)
})
