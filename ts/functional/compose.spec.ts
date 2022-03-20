import { compose, isType } from '..'

test('works with endofunctors: +2 *3', () => {
  const plus2 = (x: number) => x + 2
  const multiply3 = (x: number) => x * 3

  const a = compose(plus2, multiply3)

  isType.equal<true, (a: number) => number, typeof a>()
  expect(a(2)).toBe(12)
})

test('cross types', () => {
  const n2s = (n: number) => '' + n
  const len1 = (s: string) => s.length === 1

  const isSingleDigit = compose(n2s, len1)

  isType.equal<true, (n: number) => boolean, typeof isSingleDigit>()
  expect(isSingleDigit(1)).toBe(true)
  expect(isSingleDigit(10)).toBe(false)
})

test('multiple params first function', () => {
  const add = (a: number, b: number) => a + b
  const multiply3 = (x: number) => x * 3

  const a = compose(add, multiply3)

  isType.equal<true, (a: number, b: number) => number, typeof a>()
  expect(a(2, 2)).toBe(12)
})
