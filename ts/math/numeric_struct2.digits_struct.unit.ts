import { describe, it } from '@jest/globals'
import { testType } from '../index.js'
import type { DigitsStruct } from './numeric_struct2.js'

describe('Normalize', () => {
	it('remain unchanged if every digits are single digits for bigint', () => {
		testType.equal<DigitsStruct.Normalize<['+', [0], 0]>, ['+', [0], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [9], 0]>, ['+', [9], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [1, 2, 3], 0]>, ['+', [1, 2, 3], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [1, 2, 3], 1]>, ['+', [1, 2, 3], 1]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [0, 0, 1, 2, 3], 4]>, ['+', [0, 0, 1, 2, 3], 4]>(true)

		testType.equal<DigitsStruct.Normalize<['-', [0], 0]>, ['-', [0], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['-', [9], 0]>, ['-', [9], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['-', [1, 2, 3], 0]>, ['-', [1, 2, 3], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['-', [1, 2, 3], 1]>, ['-', [1, 2, 3], 1]>(true)
		testType.equal<DigitsStruct.Normalize<['-', [0, 0, 1, 2, 3], 4]>, ['-', [0, 0, 1, 2, 3], 4]>(true)
	})

	// it('advance digits when digit > 10', () => {
	// 	testType.equal<DigitsStruct.Normalize<['+', [10], 0]>, ['+', [1, 0], 0]>(true)

	// 	testType.equal<DigitsStruct.Normalize<['+', [81], 0]>, ['+', [8, 1], 0]>(true)

	// 	testType.equal<DigitsStruct.Normalize<['+', [1, 10], 0]>, ['+', [2, 0], 0]>(true)
	// 	testType.equal<DigitsStruct.Normalize<['+', [1, 81], 0]>, ['+', [9, 1], 0]>(true)

	// 	testType.equal<DigitsStruct.Normalize<['+', [81, 81], 0]>, ['+', [8, 9, 1], 0]>(true)

	// 	testType.equal<DigitsStruct.Normalize<['+', [9, 9, 9, 9, 10], 0]>, ['+', [1, 0, 0, 0, 0, 0], 0]>(true)
	// })
})
