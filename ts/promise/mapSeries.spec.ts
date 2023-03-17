import { mapSeries } from '../index.js'

test('map over values', () => {
	const values = [3, 2, 1]
	let actual = ''

	return mapSeries(values, v => new Promise<string>(a => setTimeout(() => a((actual += v)), v * 10))).then(
		result => {
			expect(actual).toBe('321')
			expect(result).toEqual(['3', '32', '321'])
		}
	)
})
