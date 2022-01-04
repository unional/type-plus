import { T } from '..'
import { conform } from './conform'

test('conform is strict', () => {
  const t = T.tuple.create(T.string)
  expect(conform(t, ['a', 'b', 'c', 'd'])).toBe(false)
})
