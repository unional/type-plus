import { assertType, satisfy, types } from '.'

test('undefined', () => {
  expect(satisfy(types.Undefined, undefined)).toBe(true)
  notSatisfyTypesOtherThan(types.Undefined, undefined)

  const value: unknown = undefined
  if (satisfy(types.Undefined, value)) {
    assertType<undefined>(value)
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
