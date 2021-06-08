import { getField } from '..'

test('support undefined', () => {
  const sub: { a: number } | undefined = { a: 1 }
  expect(getField(sub, 'a')).toBe(1)
})

test('support null', () => {
  const sub: { a: number } | null = { a: 1 }
  expect(getField(sub, 'a')).toBe(1)
})

test('can specify default value', () => {
  const sub: { a?: number } = { a: undefined }
  expect(getField(sub, 'a', 2)).toBe(2)
})

test('get from union keys', () => {
  const sub: { a: number, b: string } | { a: number, c: string } = { a: 1, b: 'b' }
  expect(getField(sub, 'b')).toBe('b')
})
