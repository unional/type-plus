import { it } from '@jest/globals'
import { testType, type UnionKeys } from './index.js'

it('gets the keys of an object', () => {
	testType.equal<UnionKeys<{ a: 1, b: 2 }>, 'a' | 'b'>(true)
})


it('returns known keys', () => {
	type Foo = {
		a: string
		b: string
	}

	// @ts-ignore
	function foo<T>(input: UnionKeys<Foo & T>): void {
		input = 'a'
		input = 'b'
		// @ts-expect-error
		input = 'c'

		let r: keyof (Foo & T)
		r = 'a'
		r = 'b'
		// @ts-expect-error
		r = 'c'
	}
})
