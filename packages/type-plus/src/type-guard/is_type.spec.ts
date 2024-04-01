import { describe, expect, it, test } from '@jest/globals'

import { type IsEqual, isType, testType } from '../index.js'

describe('isType()', () => {
	describe('without validator', () => {
		test('subject type is checked at compile time', () => {
			// @ts-expect-error
			isType<{ a: 1 }>({})
		})
		test('work with falsy value such as empty string', () => {
			const s = ''
			if (isType<''>(s)) {
				type R = typeof s
				testType.equal<R, ''>(true)
			}
		})
	})
	describe('with validator function', () => {
		test('Specify T in the validate function', () => {
			const s: unknown = false
			if (isType(s, (s: boolean) => typeof s === 'boolean')) {
				type R = typeof s
				testType.equal<R, boolean>(true)
			}
		})
		test('Specify T at type declaration', () => {
			const s: unknown = false
			if (isType<boolean>(s, (s) => typeof s === 'boolean')) {
				type R = typeof s
				testType.equal<R, boolean>(true)
			}
		})
		test('exclude type if type guard fails', () => {
			const s = 1 as string | number
			if (isType<string>(s, (s) => typeof s === 'string')) {
				type R = typeof s
				testType.equal<R, string>(true)
			} else {
				type R = typeof s
				testType.equal<R, number>(true)
			}
		})

		it('can use a truthy validator', () => {
			const s: any = { a: 1 }
			if (isType<{ a: number }>(s, (s) => s.a)) {
				type R = typeof s
				testType.equal<R, { a: number }>(true)
			} else {
				type R = typeof s
				testType.equal<R, any>(true)
			}
		})
		test('subject can be type any', () => {
			const s: any = false
			if (isType<boolean>(s, (s) => typeof s === 'boolean')) {
				type R = typeof s
				testType.equal<R, boolean>(true)
			}
		})
	})
})

describe('isType.t()', () => {
	test('accept true type but not false or boolean', () => {
		expect(isType.t<true>()).toBe(true)
		expect(isType.t<IsEqual<1, 1>>()).toBe(true)

		// @ts-expect-error
		isType.t<false>()
		// @ts-expect-error
		isType.t<boolean>()
	})
	test('accept value with type true but not false or boolean', () => {
		expect(isType.t(true)).toBe(true)

		// @ts-expect-error
		isType.t(false)
		// @ts-expect-error
		isType.t(true as Boolean)
	})
})

describe('isType.f()', () => {
	test('accept false type but not true or boolean', () => {
		expect(isType.f<false>()).toBe(true)
		expect(isType.f<IsEqual<1, 2>>()).toBe(true)

		// @ts-expect-error
		isType.f<true>()

		// @ts-expect-error
		isType.f<boolean>()
	})
	test('accept value with type true but not false or boolean', () => {
		expect(isType.f(false)).toBe(true)

		// @ts-expect-error
		isType.f(true)
		// @ts-expect-error
		isType.f(false as Boolean)
	})
})

describe('isType.equal()', () => {
	test('true case', () => {
		isType.equal<true, 1, 1>()
	})
	test('false case', () => {
		isType.equal<false, '1', 1>()
	})
})
