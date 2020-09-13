import { assertType, satisfy, types } from '.'
import { assignability } from './assignability'

test('undefined', () => {
  expect(satisfy(types.Undefined, undefined)).toBe(true)
  notSatisfyTypesOtherThan(types.Undefined, undefined)

  const value: unknown = undefined
  if (satisfy(types.Undefined, value)) {
    assertType<undefined>(value)
  }
})

test('null', () => {
  expect(satisfy(types.Null, null)).toBe(true)
  notSatisfyTypesOtherThan(types.Null, null)

  const value: unknown = null
  if (satisfy(types.Null, value)) {
    assertType<null>(value)
  }
})

test('boolean', () => {
  expect(satisfy(types.Boolean, true)).toBe(true)
  expect(satisfy(types.Boolean, false)).toBe(true)
  notSatisfyTypesOtherThan(types.Boolean, true, false)

  const value: unknown = undefined
  if (satisfy(types.Boolean, value)) {
    assertType<boolean>(value)
  }
})

test('true', () => {
  expect(satisfy(types.True, true)).toBe(true)
  notSatisfyTypesOtherThan(types.True, true)

  const value: unknown = true
  if (satisfy(types.True, value)) {
    assertType<true>(value)
  }
})

test('false', () => {
  expect(satisfy(types.False, false)).toBe(true)
  notSatisfyTypesOtherThan(types.False, false)

  const value: unknown = false
  if (satisfy(types.False, value)) {
    assertType<false>(value)
  }
})

test('true not satisfy False', () => {
  expect(satisfy(types.False, true)).toBe(false)
})

test('false not satisfy True', () => {
  expect(satisfy(types.True, false)).toBe(false)
})

test('number', () => {
  expect(satisfy(types.Number, 0)).toBe(true)
  notSatisfyTypesOtherThan(types.Number, 0, 1)

  const value: unknown = 0
  if (satisfy(types.Number, value)) {
    assertType<number>(value)
    assertType.isFalse(assignability<0>()(value))
  }
})

test('number:0', () => {
  expect(satisfy(types.Number.val(0), 0)).toBe(true)
  notSatisfyTypesOtherThan(types.Number.val(0), 0)

  const value: unknown = 0
  if (satisfy(types.Number.val(0), value)) {
    assertType<0>(value)
  }
})

test('number:1', () => {
  expect(satisfy(types.Number.val(1), 1)).toBe(true)
  notSatisfyTypesOtherThan(types.Number.val(1), 1)

  const value: unknown = 1
  if (satisfy(types.Number.val(1), value)) {
    assertType<1>(value)
  }
})

test('0 not satisfy 1', () => {
  expect(satisfy(types.Number.val(1), 0)).toBe(false)
})

test('1 not satisfy 0', () => {
  expect(satisfy(types.Number.val(0), 1)).toBe(false)
})

test.todo('number list')
test.todo('number range')

test('string', () => {
  expect(satisfy(types.String, '')).toBe(true)
  notSatisfyTypesOtherThan(types.String, '', 'a')

  const value: unknown = ''
  if (satisfy(types.String, value)) {
    assertType<string>(value)
    assertType.isFalse(assignability<''>()(value))
  }
})

test(`string:''`, () => {
  expect(satisfy(types.String, '')).toBe(true)
  notSatisfyTypesOtherThan(types.String, '')

  const value: unknown = ''
  if (satisfy(types.String.val(''), value)) {
    assertType<''>(value)
  }
})

test(`string:'a'`, () => {
  expect(satisfy(types.String, 'a')).toBe(true)
  notSatisfyTypesOtherThan(types.String, '', 'a')

  const value: unknown = 'a'
  if (satisfy(types.String.val('a'), value)) {
    assertType<'a'>(value)
  }
})

test(`'' not satisfy 'a'`, () => {
  expect(satisfy(types.String.val('a'), '')).toBe(false)
})

test(`'a' not satisfy ''`, () => {
  expect(satisfy(types.String.val(''), 'a')).toBe(false)
})

test('bigint', () => {
  expect(satisfy(types.BigInt, 0n)).toBe(true)
  notSatisfyTypesOtherThan(types.BigInt, 0n, 1n)

  const value: unknown = 0n
  if (satisfy(types.BigInt, value)) {
    assertType<bigint>(value)
    assertType.isFalse(assignability<0>()(value))
  }
})

test('bigint:0', () => {
  expect(satisfy(types.BigInt.val(0n), 0n)).toBe(true)
  notSatisfyTypesOtherThan(types.BigInt.val(0n), 0n)

  const value: unknown = 0n
  if (satisfy(types.BigInt.val(0n), value)) {
    assertType<0n>(value)
  }
})

test('bigint:1', () => {
  expect(satisfy(types.BigInt.val(1n), 1n)).toBe(true)
  notSatisfyTypesOtherThan(types.BigInt.val(1n), 1n)

  const value: unknown = 1n
  if (satisfy(types.BigInt.val(1n), value)) {
    assertType<1n>(value)
  }
})

test('0n not satisfy 1n', () => {
  expect(satisfy(types.BigInt.val(1n), 0n)).toBe(false)
})

test('1n not satisfy 0n', () => {
  expect(satisfy(types.BigInt.val(0n), 1n)).toBe(false)
})

test('symbol', () => {
  expect(satisfy(types.Symbol, Symbol())).toBe(true)
  notSatisfyTypesOtherThan(types.Symbol, Symbol())

  const value: unknown = Symbol()
  if (satisfy(types.Symbol, value)) {
    assertType<symbol>(value)
  }
})

test('union', () => {
  const t = types.Union.join(types.Boolean, types.Number)
  expect(satisfy(t, 0)).toBe(true)
  expect(satisfy(t, false)).toBe(true)

  const value: unknown = 0
  if (satisfy(t, value)) {
    assertType<boolean | number>(value)
  }
})

test('union single type gets the type back', () => {
  const t = types.Union.join(types.Boolean)
  expect(satisfy(t, false)).toBe(true)

  const value: unknown = true
  if (satisfy(t, value)) {
    assertType<boolean>(value)
  }
})

test('union of multiple primitive types', () => {
  const t = types.Union.join(types.Boolean, types.Null, types.Number)
  expect(satisfy(t, false)).toBe(true)

  const value: unknown = true
  if (satisfy(t, value)) {
    assertType<boolean | null | number>(value)
  }
})

test('if condition', () => {
  types.If(types.False, {}, false as const)
})

test.todo('optional')

function notSatisfyTypesOtherThan(type: types.AllTypes, ...excepts: unknown[]) {
  const values = [undefined, null, true, false, 0, 1, 0n, 1n, '', 'a', [], {}, Symbol(), Symbol.for('a')]
  values.forEach(v => {
    if (excepts.indexOf(v) !== -1) {
      expect(satisfy(type, v))
    }
  })
}
