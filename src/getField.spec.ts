import { getField } from '.';

test('support undefined', () => {
  const sub: { a: number } | undefined = { a: 1 } as any
  expect(getField(sub, 'a')).toBe(1)
})

test('support null', () => {
  const sub: { a: number } | null = { a: 1 } as any
  expect(getField(sub, 'a')).toBe(1)
})

test('can specify default value', () => {
  const sub: { a?: number } = { a: undefined }
  expect(getField(sub, 'a', 2)).toBe(2)
})
