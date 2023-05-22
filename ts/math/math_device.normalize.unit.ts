import { it } from '@jest/globals'
import { testType } from '../index.js'
import type { MathDevice } from './math_device.js'

it('remain unchanged if every digits are single digits for bigint', () => {
	testType.equal<MathDevice.Normalize<['bigint', '+', [0]]>, ['bigint', '+', [0]]>(true)
	testType.equal<MathDevice.Normalize<['bigint', '+', [9]]>, ['bigint', '+', [9]]>(true)
	testType.equal<MathDevice.Normalize<['bigint', '+', [1, 2, 3]]>, ['bigint', '+', [1, 2, 3]]>(true)

	testType.equal<MathDevice.Normalize<['bigint', '-', [0]]>, ['bigint', '-', [0]]>(true)
	testType.equal<MathDevice.Normalize<['bigint', '-', [9]]>, ['bigint', '-', [9]]>(true)
	testType.equal<MathDevice.Normalize<['bigint', '-', [1, 2, 3]]>, ['bigint', '-', [1, 2, 3]]>(true)
})

it('normalizes bigint', () => {
	testType.equal<MathDevice.Normalize<['bigint', '+', [10]]>, ['bigint', '+', [1, 0]]>(true)

	testType.equal<MathDevice.Normalize<['bigint', '+', [81]]>, ['bigint', '+', [8, 1]]>(true)

	testType.equal<MathDevice.Normalize<['bigint', '+', [1, 10]]>, ['bigint', '+', [2, 0]]>(true)
	testType.equal<MathDevice.Normalize<['bigint', '+', [1, 81]]>, ['bigint', '+', [9, 1]]>(true)

	testType.equal<MathDevice.Normalize<['bigint', '+', [81, 81]]>, ['bigint', '+', [8, 9, 1]]>(true)

	testType.equal<
		MathDevice.Normalize<['bigint', '+', [9, 9, 9, 9, 10]]>,
		['bigint', '+', [1, 0, 0, 0, 0, 0]]
	>(true)
})
