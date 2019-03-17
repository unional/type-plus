import { mapSeries } from '.';

test('map over values', async () => {
  const values = [3, 2, 1]
  let actual = ''

  const result = await mapSeries(values, v => new Promise<string>(a => setTimeout(() => a(actual += v), v * 10)))

  expect(actual).toBe('321')
  expect(result).toEqual(['3', '32', '321'])
})
