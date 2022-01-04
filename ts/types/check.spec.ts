import { T } from '..'
import { check } from './check'

test('check without strict', () => {
  const t = T.tuple.create(T.string)
  expect(check({ strict: false }, t, ['a', 'b', 'c', 'd'])).toBe(true)
})

test('check with strict', () => {
  const t = T.tuple.create(T.string)
  expect(check({ strict: true }, t, ['a', 'b', 'c', 'd'])).toBe(false)
})
