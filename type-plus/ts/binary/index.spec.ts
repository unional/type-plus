import { test } from '@jest/globals'

import { testType } from '../index.js'
import type { B } from './index.js'

test('B.BitNot<T>', () => {
	testType.equal<B.BitNot<1>, 0>(true)
	testType.equal<B.BitNot<0>, 1>(true)
})

test('B.BitAnd<A, B>', () => {
	testType.equal<B.BitAnd<1, 1>, 1>(true)
	testType.equal<B.BitAnd<1, 0>, 0>(true)
	testType.equal<B.BitAnd<0, 1>, 0>(true)
	testType.equal<B.BitAnd<0, 0>, 0>(true)
})

test('B.BitOr<A, B>', () => {
	testType.equal<B.BitOr<1, 1>, 1>(true)
	testType.equal<B.BitOr<1, 0>, 1>(true)
	testType.equal<B.BitOr<0, 1>, 1>(true)
	testType.equal<B.BitOr<0, 0>, 0>(true)
})

test('B.BitXor<A, B>', () => {
	testType.equal<B.BitXor<1, 1>, 0>(true)
	testType.equal<B.BitXor<1, 0>, 1>(true)
	testType.equal<B.BitXor<0, 1>, 1>(true)
	testType.equal<B.BitXor<0, 0>, 0>(true)
})
