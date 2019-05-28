import { pick } from '.';

test('pick properties from object', () => {
  const actual = pick({ a: 1, b: 2 }, 'a')

  expect(actual).toEqual({ a: 1 })
})
