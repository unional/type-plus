import { isType, split } from '..'

const target = { a: 0, b: '', c: false }
test('can use undefined as default', () => {
  const [{ a }] = split(target, { a: undefined })

  isType.equal<true, typeof a, number | undefined>()
  expect(a).toBe(0)
})

test('can specify default with the same type', () => {
  const [{ a }] = split(target, { a: 2 })

  isType.equal<true, typeof a, number>()
  expect(a).toBe(0)
})

test('can specify default as one of the intersect types', () => {
  const [a] = split({ a: undefined as number | string | undefined }, { a: '2' })

  isType.equal<true, typeof a, { a: number | string }>()
  expect(a).toEqual({ a: '2' })
})

test('get remaining props in the last entry', () => {
  const [, r] = split(target, { a: undefined })

  isType.equal<true, typeof r, { b: string, c: boolean }>()
  expect(r).toEqual({ b: '', c: false })
})

test('work with simple Record', () => {
  const [a] = split({} as Record<string, string>, { a: 'a' })

  isType.equal<true, typeof a, { a: string }>()
  expect(a).toEqual({ a: 'a' })
})

test('can specify multiple splitters', () => {
  const t = { r: 'r' } as { a?: string, b?: string, c?: string, r?: string }
  const [a, b, c, r] = split(t,
    { a: 'a' },
    { b: 'b' },
    { c: 'c' }
  )
  isType.equal<true, typeof a, { a: string }>()
  isType.equal<true, typeof b, { b: string }>()
  isType.equal<true, typeof c, { c: string }>()
  isType.equal<true, typeof r, { r?: string | undefined }>()
  expect(a).toEqual({ a: 'a' })
  expect(b).toEqual({ b: 'b' })
  expect(c).toEqual({ c: 'c' })
  expect(r).toEqual({ r: 'r' })
})
