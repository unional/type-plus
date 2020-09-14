import { satisfies } from 'satisfier'
import { assertType, satisfy, types } from '.'
import { assignability } from './assignability'

test('undefined', () => {
  expect(satisfy(types.undefined, undefined)).toBe(true)
  notSatisfyTypesOtherThan(types.undefined, undefined)

  const value: unknown = undefined
  if (satisfy(types.undefined, value)) {
    assertType<undefined>(value)
  }
})

test('null', () => {
  expect(satisfy(types.null, null)).toBe(true)
  notSatisfyTypesOtherThan(types.null, null)

  const value: unknown = null
  if (satisfy(types.null, value)) {
    assertType<null>(value)
  }
})

test('boolean', () => {
  expect(satisfy(types.boolean, true)).toBe(true)
  expect(satisfy(types.boolean, false)).toBe(true)
  notSatisfyTypesOtherThan(types.boolean, true, false)

  const value: unknown = undefined
  if (satisfy(types.boolean, value)) {
    assertType<boolean>(value)
  }
})

test('boolean:true', () => {
  expect(satisfy(types.boolean.true, true)).toBe(true)
  notSatisfyTypesOtherThan(types.boolean.true, true)

  const value: unknown = true
  if (satisfy(types.boolean.true, value)) {
    assertType<true>(value)
  }
})

test('boolean:false', () => {
  expect(satisfy(types.boolean.false, false)).toBe(true)
  notSatisfyTypesOtherThan(types.boolean.false, false)

  const value: unknown = false
  if (satisfy(types.boolean.false, value)) {
    assertType<false>(value)
  }
})

test('true not satisfy False', () => {
  expect(satisfy(types.boolean.false, true)).toBe(false)
})

test('false not satisfy True', () => {
  expect(satisfy(types.boolean.true, false)).toBe(false)
})

test('number', () => {
  expect(satisfy(types.number, 0)).toBe(true)
  notSatisfyTypesOtherThan(types.number, 0, 1)

  const value: unknown = 0
  if (satisfy(types.number, value)) {
    assertType<number>(value)
    assertType.isFalse(assignability<0>()(value))
  }
})

test('number:0', () => {
  expect(satisfy(types.number.create(0), 0)).toBe(true)
  notSatisfyTypesOtherThan(types.number.create(0), 0)

  const value: unknown = 0
  if (satisfy(types.number.create(0), value)) {
    assertType<0>(value)
  }
})

test('number:1', () => {
  expect(satisfy(types.number.create(1), 1)).toBe(true)
  notSatisfyTypesOtherThan(types.number.create(1), 1)

  const value: unknown = 1
  if (satisfy(types.number.create(1), value)) {
    assertType<1>(value)
  }
})

test('0 not satisfy 1', () => {
  expect(satisfy(types.number.create(1), 0)).toBe(false)
})

test('1 not satisfy 0', () => {
  expect(satisfy(types.number.create(0), 1)).toBe(false)
})

test.todo('number list')
test.todo('number range')

test('string', () => {
  expect(satisfy(types.string, '')).toBe(true)
  notSatisfyTypesOtherThan(types.string, '', 'a')

  const value: unknown = ''
  if (satisfy(types.string, value)) {
    assertType<string>(value)
    assertType.isFalse(assignability<''>()(value))
  }
})

test(`string:''`, () => {
  expect(satisfy(types.string, '')).toBe(true)
  notSatisfyTypesOtherThan(types.string, '')

  const value: unknown = ''
  if (satisfy(types.string.create(''), value)) {
    assertType<''>(value)
  }
})

test(`string:'a'`, () => {
  expect(satisfy(types.string, 'a')).toBe(true)
  notSatisfyTypesOtherThan(types.string, '', 'a')

  const value: unknown = 'a'
  if (satisfy(types.string.create('a'), value)) {
    assertType<'a'>(value)
  }
})

test(`'' not satisfy 'a'`, () => {
  expect(satisfy(types.string.create('a'), '')).toBe(false)
})

test(`'a' not satisfy ''`, () => {
  expect(satisfy(types.string.create(''), 'a')).toBe(false)
})

// test('bigint', () => {
//   expect(satisfy(types.bigint, 0n)).toBe(true)
//   notSatisfyTypesOtherThan(types.bigint, 0n, 1n)

//   const value: unknown = 0n
//   if (satisfy(types.bigint, value)) {
//     assertType<bigint>(value)
//     assertType.isFalse(assignability<0>()(value))
//   }
// })

// test('bigint:0', () => {
//   expect(satisfy(types.bigint.create(0n), 0n)).toBe(true)
//   notSatisfyTypesOtherThan(types.bigint.create(0n), 0n)

//   const value: unknown = 0n
//   if (satisfy(types.bigint.create(0n), value)) {
//     assertType<0n>(value)
//   }
// })

// test('bigint:1', () => {
//   expect(satisfy(types.bigint.create(1n), 1n)).toBe(true)
//   notSatisfyTypesOtherThan(types.bigint.create(1n), 1n)

//   const value: unknown = 1n
//   if (satisfy(types.bigint.create(1n), value)) {
//     assertType<1n>(value)
//   }
// })

// test('0n not satisfy 1n', () => {
//   expect(satisfy(types.bigint.create(1n), 0n)).toBe(false)
// })

// test('1n not satisfy 0n', () => {
//   expect(satisfy(types.bigint.create(0n), 1n)).toBe(false)
// })

test('symbol', () => {
  expect(satisfy(types.symbol, Symbol())).toBe(true)
  notSatisfyTypesOtherThan(types.symbol, Symbol())

  const value: unknown = Symbol()
  if (satisfy(types.symbol, value)) {
    assertType<symbol>(value)
  }
})

describe('union', () => {
  test('zero type gets never', () => {
    const t = types.union.create()
    expect(satisfy(t, undefined)).toBe(false)

    const value: unknown = true
    if (satisfy(t, value)) {
      assertType<never>(value)
    }
  })

  test('single type gets the type back', () => {
    const t = types.union.create(types.boolean)
    expect(satisfy(t, false)).toBe(true)

    const value: unknown = true
    if (satisfy(t, value)) {
      assertType<boolean>(value)
    }
  })

  test('on two types', () => {
    const t = types.union.create(types.boolean, types.number)
    expect(satisfy(t, 0)).toBe(true)
    expect(satisfy(t, false)).toBe(true)

    const value: unknown = 0
    if (satisfy(t, value)) {
      assertType<boolean | number>(value)
    }
  })

  test('on multiple primitive types', () => {
    const t = types.union.create(types.boolean, types.null, types.number)
    expect(satisfy(t, false)).toBe(true)

    const value: unknown = true
    if (satisfy(t, value)) {
      assertType<boolean | null | number>(value)
    }
  })

  test('nested union is flatten', () => {
    // TODO: flatten union type at `join()`
    // currently it is not, but the recursion work at `satisfy()`
    // when types is complex,
    // this will not work as TypeScript has limited on the number of recursion.
    const t = types.union.create(types.union.create(types.boolean, types.null))
    expect(satisfy(t, false)).toBe(true)
    const value: unknown = true
    if (satisfy(t, value)) {
      assertType<boolean | null>(value)
    }
  })
});

describe('array', () => {
  test('base type satisfies any array', () => {
    expect(satisfy(types.array, [])).toBe(true)
    expect(satisfy(types.array, ['a'])).toBe(true)

    const value: unknown = []
    if (satisfy(types.array, value)) {
      // Note that this test is weak.
      // I don't have a good way to nail it down as it is a top type.
      assertType<any[]>(value)
    }
  })
  test('base type does not satisfy non-array', () => {
    notSatisfyTypesOtherThan(types.array, [], ['a'])
  })

  test('unknown type assert result to unknown[]', () => {
    expect(satisfy(types.array.unknown, [])).toBe(true)
    expect(satisfy(types.array.unknown, ['a'])).toBe(true)

    const value: unknown = []
    if (satisfy(types.array.unknown, value)) {
      // Note that this test is weak.
      // I don't have a good way to nail it down as it is a top type.
      assertType<unknown[]>(value)
    }
  })

  test('unknown type does not satisfy non-array', () => {
    notSatisfyTypesOtherThan(types.array.unknown, [], ['a'])
  })

  test('specific type', () => {
    const t = types.array.create(types.number)
    expect(satisfy(t, [])).toBe(true)
    expect(satisfy(t, [0])).toBe(true)
    expect(satisfy(t, [1, 2])).toBe(true)
    expect(satisfy(t, ['a'])).toBe(false)
    expect(satisfy(t, [1, 'a'])).toBe(false)
    expect(satisfy(t, ['a', 1])).toBe(false)

    const value: unknown = ['a']
    if (satisfy(t, value)) {
      assertType<number[]>(value)
    }
  })

  test('union type', () => {
    const t = types.array.create(types.union.create(types.number, types.boolean))
    expect(satisfy(t, [])).toBe(true)
    expect(satisfy(t, [0])).toBe(true)
    expect(satisfy(t, [false])).toBe(true)
    expect(satisfy(t, [false, 0])).toBe(true)
    expect(satisfy(t, [0, false, ''])).toBe(false)

    const value: unknown = [0, false]
    if (satisfy(t, value)) {
      assertType<Array<number | boolean>>(value)
    }
  })
})

test('if condition', () => {
  types.If(types.boolean.false, {}, false as const)
})

test.todo('optional')

function notSatisfyTypesOtherThan(type: types.AllTypes, ...excepts: any[]) {
  const values = [undefined, null, true, false, 0, 1, 0n, 1n, '', 'a', [], ['a'], {}, Symbol(), Symbol.for('a')]
  values.forEach(v => {
    if (!excepts.some(e => satisfies(v, e))) {
      expect(satisfy(type, v))
    }
  })
}
