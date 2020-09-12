import { assertType, satisfy, types } from '.'

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

test('number', () => {
  expect(satisfy(types.Number, 0)).toBe(true)
  notSatisfyTypesOtherThan(types.Number, 0, 1)

  const value: unknown = 0
  if (satisfy(types.Number, value)) {
    assertType<number>(value)
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

test.todo('number list')
test.todo('number range')

test('if statement', () => {
  types.If(types.False, {}, false as const)
})

function notSatisfyTypesOtherThan(type: types.AllTypes, ...excepts: unknown[]) {
  const values = [undefined, null, true, false, 0, 1, 0n, 1n, '', 'a', [], {}]
  values.forEach(v => {
    if (excepts.indexOf(v) !== -1) {
      expect(satisfy(type, v))
    }
  })
}
