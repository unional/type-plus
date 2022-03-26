import { isType, stub } from '..'

test('stub is a partial of the actual object', () => {
  const real = { a: 1, b: { c: 2 }, d: 3 }

  const a = stub<typeof real>({ a: 2 })
  expect(a.a).toBe(2)
  isType.equal<true, typeof a, typeof real>()
})

test('stub function retains param types', () => {
  function real(a: string, b: number): boolean { return a === String(b) }

  const a = stub<typeof real>((_a, _b) => {
    isType.equal<true, string, typeof _a>()
    isType.equal<true, number, typeof _b>()
    return false
  })

  expect(a('1', 1)).toBe(false)
  isType.equal<true, typeof a, typeof real>()
})

test('stub function params can be omitted', () => {
  function real(a: string, b: number): boolean { return a === String(b) }

  const a = stub<typeof real>(() => false)

  expect(a('1', 1)).toBe(false)
  isType.equal<true, typeof a, typeof real>()
})
