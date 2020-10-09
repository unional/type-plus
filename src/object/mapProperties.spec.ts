import { mapProperties } from './mapProperties'

test('basic usage', () => {
  const actual = mapProperties({ a: 1, b: 2 }, (v, k) => k + (v * 2))
  expect(actual).toEqual({ a: 'a2', b: 'b4' })
})
