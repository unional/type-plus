import { isType, KeyTypes, record } from '..'

test('create an empty record with value default to unknown', () => {
  const a = record()
  a[1] = 2
  a['a'] = 'b'
  a[Symbol()] = true
  isType.equal<true, Record<KeyTypes, unknown>, typeof a>()
})

test('specify key and value types', () => {
  const a = record<string, number>()
  // even though the key type is string,
  // by default JavaScript will cast number index to string
  // so TypeScript also allows it.
  a[1] = 2
  a['a'] = 3
  isType.equal<true, Record<string, number>, typeof a>()
})

test('no prototype', () => {
  const a = record()
  expect(Object.getPrototypeOf(a)).toBeNull()
})

test('infer type from initial value, the key type is widen', () => {
  const stringRecord = record({ a: 1 })
  isType.equal<true, Record<string, number>, typeof stringRecord>()

  const numberRecord = record({ 1: 3 })
  isType.equal<true, Record<number, number>, typeof numberRecord>()

  const stringConstRecord = record({ a: 1 } as const)
  isType.equal<true, Record<string, 1>, typeof stringConstRecord>()

  const stringConstRecord2 = record({ a: 1 as const })
  isType.equal<true, Record<string, 1>, typeof stringConstRecord2>()

  const stringConstRecord3 = record({ a: 1 as const, b: 'b' })
  isType.equal<true, Record<string, 1 | string>, typeof stringConstRecord3>()

  const stringConstRecord4 = record({ a: 1 as const, b: 'b' as const })
  isType.equal<true, Record<string, 1 | 'b'>, typeof stringConstRecord4>()
})

test('no prototype with initial value', () => {
  const a = record({ a: 1 })
  expect(Object.getPrototypeOf(a)).toBeNull()
})

test('Object.keys() gets the keys of the initial value', () => {
  const a = record({ a: 1, b: 2 })
  expect(Object.keys(a)).toEqual(['a', 'b'])
})
