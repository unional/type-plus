import { describe, it } from '@jest/globals'

import { type IsNever,isType } from './index.js'

describe('IsNever<T>', () => {
	it('checks if type is never', () => {
		isType.equal<true, true, IsNever<never>>()
		isType.equal<true, false, IsNever<undefined>>()
		isType.equal<true, false, IsNever<null>>()
		isType.equal<true, false, IsNever<number>>()
		isType.equal<true, false, IsNever<{ a: number }>>()
		isType.equal<true, false, IsNever<[]>>()
	})
})
