import { test } from '@jest/globals'
import { testType, type IsEmptyObject } from '../index.js'

test('true for {}', () => {
	testType.true<IsEmptyObject<{}>>(true)
})
test('false for everything else', () => {
	testType.false<IsEmptyObject<undefined>>(true)
	testType.false<IsEmptyObject<false>>(true)
	testType.false<IsEmptyObject<0>>(true)
	testType.false<IsEmptyObject<''>>(true)
	testType.false<IsEmptyObject<{ a: 1 }>>(true)
})
