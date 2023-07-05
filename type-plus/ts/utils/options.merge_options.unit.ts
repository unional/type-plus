import { it } from '@jest/globals'
import { testType, type MergeCases } from '../index.js'

it('overrides cases', () => {
	testType.equal<
		MergeCases<{ a: 3 }, { a: 1, b: 2 }>,
		{ a: 3, b: 2 }
	>(true)
})

it('can specify input value as never', () => {
	testType.equal<
		MergeCases<{ a: never }, { a: undefined, b: 2 }>,
		{ a: never, b: 2 }>(true)
})
