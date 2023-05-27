import { describe, it } from '@jest/globals'
import { testType } from '../index.js'
import { DigitsStruct } from './digit_struct.js'

describe('DigitsStruct.GetMinPadEnd', () => {
	it('returns [0, M] if one of the value is 0', () => {
		testType.equal<DigitsStruct.GetMinPadEnd<0, 1>, [[], 'B']>(true)
		testType.equal<DigitsStruct.GetMinPadEnd<2, 0>, [[], 'A']>(true)
	})

	it('returns [[0...n], M]', () => {
		testType.equal<DigitsStruct.GetMinPadEnd<4, 1>, [[0], 'A']>(true)
		testType.equal<DigitsStruct.GetMinPadEnd<3, 7>, [[0, 0, 0], 'B']>(true)
	})
})

describe('AddNormalizedNumberStruct', () => {
	it('0 + 0', () => {
		testType.equal<DigitsStruct.AddNormalized<[[0], 0, 0], [[0], 0, 0]>, [[0], 0, 0]>(true)
	})
})
