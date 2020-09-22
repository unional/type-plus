import { satisfies } from 'satisfier'
import { assertType, assignability, satisfy, types } from '.'

test('undefined', () => {
  expect(satisfy(types.undefined, undefined)).toBe(true)
  notSatisfyTypesOtherThan(types.undefined, undefined)

  const value: unknown = undefined
  if (satisfy(types.undefined, value)) {
    assertType<undefined>(value)
  }
})

describe('null', () => {
  test('satisfies only null', () => {
    expect(satisfy(types.null, null)).toBe(true)
    notSatisfyTypesOtherThan(types.null, null)

    const value: unknown = null
    if (satisfy(types.null, value)) {
      assertType<null>(value)
    }
  })
  test('optional', () => {
    const t = types.null.optional
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<null | undefined>(value)
    }
  })
})

describe('boolean', () => {
  test('base type satisfies both true and false', () => {
    expect(satisfy(types.boolean, true)).toBe(true)
    expect(satisfy(types.boolean, false)).toBe(true)
    notSatisfyTypesOtherThan(types.boolean, true, false)

    const value: unknown = undefined
    if (satisfy(types.boolean, value)) {
      assertType<boolean>(value)
    }
  })
  test('true', () => {
    expect(satisfy(types.boolean.true, true)).toBe(true)
    notSatisfyTypesOtherThan(types.boolean.true, true)

    const value: unknown = true
    if (satisfy(types.boolean.true, value)) {
      assertType<true>(value)
    }
  })
  test('false', () => {
    expect(satisfy(types.boolean.false, false)).toBe(true)
    notSatisfyTypesOtherThan(types.boolean.false, false)

    const value: unknown = false
    if (satisfy(types.boolean.false, value)) {
      assertType<false>(value)
    }
  })
  test('true does not satisfy False', () => {
    expect(satisfy(types.boolean.false, true)).toBe(false)
  })
  test('false does not satisfy True', () => {
    expect(satisfy(types.boolean.true, false)).toBe(false)
  })
  test('optional', () => {
    const t = types.boolean.optional
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<boolean | undefined>(value)
    }
  })
  test('optional create', () => {
    const t = types.boolean.optional.create(true)
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<true | undefined>(value)
    }
  })
})

describe('number', () => {
  test('base type satisfy all numbers', () => {
    expect(satisfy(types.number, 0)).toBe(true)
    expect(satisfy(types.number, -1)).toBe(true)
    expect(satisfy(types.number, 1)).toBe(true)
    notSatisfyTypesOtherThan(types.number, -1, 0, 1)

    const value: unknown = 0
    if (satisfy(types.number, value)) {
      assertType<number>(value)
      assertType.isFalse(assignability<0>()(value))
    }
  })
  test('0', () => {
    expect(satisfy(types.number.create(0), 0)).toBe(true)
    notSatisfyTypesOtherThan(types.number.create(0), 0)

    const value: unknown = 0
    if (satisfy(types.number.create(0), value)) {
      assertType<0>(value)
    }
  })
  test('1', () => {
    expect(satisfy(types.number.create(1), 1)).toBe(true)
    notSatisfyTypesOtherThan(types.number.create(1), 1)

    const value: unknown = 1
    if (satisfy(types.number.create(1), value)) {
      assertType<1>(value)
    }
  })
  test('0 does not satisfy 1', () => {
    expect(satisfy(types.number.create(1), 0)).toBe(false)
  })
  test('1 does not satisfy 0', () => {
    expect(satisfy(types.number.create(0), 1)).toBe(false)
  })
  test('optional', () => {
    const t = types.number.optional
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<number | undefined>(value)
    }
  })
  test('optional create', () => {
    const t = types.number.optional.create(1)
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<1 | undefined>(value)
    }
  })
  test('list: empty is never', () => {
    const t = types.number.list()
    const value: unknown = undefined

    expect(satisfy(t, value)).toBe(false)
    if (satisfy(t, value)) {
      assertType.isNever(value)
    }
  })
  test('list: single', () => {
    const t = types.number.list(0)
    const value: unknown = 0

    expect(satisfy(t, value)).toBe(true)
    if (satisfy(t, value)) {
      assertType<0>(value)
    }
  })
  test('list: multiple', () => {
    const t = types.number.list(1, 2, 3)
    const value: unknown = 1

    expect(satisfy(t, value)).toBe(true)
    if (satisfy(t, value)) {
      assertType<1 | 2 | 3>(value)
    }
  })
  test('optional.list: multiple', () => {
    const t = types.number.optional.list(1, 2, 3)
    const value: unknown = 1

    expect(satisfy(t, value)).toBe(true)
    if (satisfy(t, value)) {
      assertType<1 | 2 | 3 | undefined>(value)
    }
  })
})

describe('string', () => {
  test('base type satisfies any string', () => {
    expect(satisfy(types.string, '')).toBe(true)
    expect(satisfy(types.string, 'a')).toBe(true)
    notSatisfyTypesOtherThan(types.string, '', 'a')

    const value: unknown = ''
    if (satisfy(types.string, value)) {
      assertType<string>(value)
      assertType.isFalse(assignability<''>()(value))
    }
  })
  test(`''`, () => {
    expect(satisfy(types.string, '')).toBe(true)
    notSatisfyTypesOtherThan(types.string, '')

    const value: unknown = ''
    if (satisfy(types.string.create(''), value)) {
      assertType<''>(value)
    }
  })
  test(`'a'`, () => {
    expect(satisfy(types.string, 'a')).toBe(true)
    notSatisfyTypesOtherThan(types.string, '', 'a')

    const value: unknown = 'a'
    if (satisfy(types.string.create('a'), value)) {
      assertType<'a'>(value)
    }
  })
  test(`'' does not satisfy 'a'`, () => {
    expect(satisfy(types.string.create('a'), '')).toBe(false)
  })
  test(`'a' does not satisfy ''`, () => {
    expect(satisfy(types.string.create(''), 'a')).toBe(false)
  })
  test('optional', () => {
    const t = types.string.optional
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<string | undefined>(value)
    }
  })
  test('optional create', () => {
    const t = types.string.optional.create('a')
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<'a' | undefined>(value)
    }
  })
  test('list: empty is never', () => {
    const t = types.string.list()
    const value: unknown = undefined

    expect(satisfy(t, value)).toBe(false)
    if (satisfy(t, value)) {
      assertType.isNever(value)
    }
  })
  test('list: single', () => {
    const t = types.string.list('a')
    const value: unknown = 'a'

    expect(satisfy(t, value)).toBe(true)
    if (satisfy(t, value)) {
      assertType<'a'>(value)
    }
  })
  test('list: multiple', () => {
    const t = types.string.list('1', '2', '3')
    const value: unknown = '1'

    expect(satisfy(t, value)).toBe(true)
    if (satisfy(t, value)) {
      assertType<'1' | '2' | '3'>(value)
    }
  })
  test('optional.list: multiple', () => {
    const t = types.string.optional.list('1', '2', '3')
    const value: unknown = '1'

    expect(satisfy(t, value)).toBe(true)
    if (satisfy(t, value)) {
      assertType<'1' | '2' | '3' | undefined>(value)
    }
  })
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

describe('symbol', () => {
  test('base type satisfies any symbol', () => {
    expect(satisfy(types.symbol, Symbol())).toBe(true)
    notSatisfyTypesOtherThan(types.symbol, Symbol())

    const value: unknown = Symbol()
    if (satisfy(types.symbol, value)) {
      assertType<symbol>(value)
    }
  })
  test('optional', () => {
    const t = types.symbol.optional
    const value: unknown = Symbol()

    expect(satisfy(t, value)).toBe(true)

    if (satisfy(t, value)) {
      assertType<symbol | undefined>(value)
    }
  })
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
    // TODO: flatten union type at `create()`
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
  test('optional create', () => {
    const t = types.union.optional.create(types.boolean)
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<boolean | undefined>(value)
    }
  })
})

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
  test('optional', () => {
    const t = types.array.optional
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<any[] | undefined>(value)
    }
  })
  test('optional create', () => {
    const t = types.array.optional.create(types.string)
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<string[] | undefined>(value)
    }
  })
})

describe('object', () => {
  test('base type satisfies any object', () => {
    expect(satisfy(types.object, {})).toBe(true)
    expect(satisfy(types.object, { a: 1 })).toBe(true)
    expect(satisfy(types.object, { 0: 0 })).toBe(true)

    const value: unknown = { a: 1 }
    if (satisfy(types.object, value)) {
      assertType<Record<string, any>>(value)
    }
  })
  test('base type does not satisfy non-object including array and null', () => {
    notSatisfyTypesOtherThan(types.object, {}, { a: 1 })
  })
  test('single prop', () => {
    const t = types.object.create({ a: types.number })
    expect(satisfy(t, { a: 0 })).toBe(true)
    expect(satisfy(t, { a: 1 })).toBe(true)

    const value: unknown = { a: 1 }
    if (satisfy(t, value)) {
      assertType<{ a: number }>(value)
    }
  })
  test('two props', () => {
    const t = types.object.create({
      a: types.number.create(1),
      b: types.string
    })
    expect(satisfy(t, { a: 1, b: '' })).toBe(true)
    expect(satisfy(t, { a: 1, b: 'b' })).toBe(true)

    const value: unknown = { a: 1, b: '' }
    if (satisfy(t, value)) {
      assertType<{ a: 1, b: string }>(value)
    }
  })
  test('props with union', () => {
    const t = types.object.create({
      a: types.union.create(types.number.create(1), types.boolean.true),
      b: types.string
    })
    expect(satisfy(t, { a: 1, b: '' })).toBe(true)
    expect(satisfy(t, { a: true, b: '' })).toBe(true)
    expect(satisfy(t, { a: false, b: '' })).toBe(false)

    const value: unknown = { a: 1, b: '' }
    if (satisfy(t, value)) {
      assertType<{ a: true | 1, b: string }>(value)
    }
  })
  test('nested object', () => {
    const t = types.object.create({
      a: types.object.create({
        b: types.number
      })
    })
    expect(satisfy(t, { a: { b: 0 } })).toBe(true)

    const value: unknown = { a: { b: 0 } }
    if (satisfy(t, value)) {
      assertType<{ a: { b: number } }>(value)
    }
  })
  test('keys is string + number + symbol', () => {
    // technically empty string is not a valid key.
    // maybe we can do a disjoint or something
    expect(satisfy(types.keys, '')).toBe(true)
    expect(satisfy(types.keys, 'a')).toBe(true)
    expect(satisfy(types.keys, 0)).toBe(true)
    expect(satisfy(types.keys, Symbol.for('abc'))).toBe(true)
  })
  test('optional', () => {
    const t = types.object.optional
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<Record<string, any> | undefined>(value)
    }
  })
  test('optional create', () => {
    const t = types.object.optional.create({
      a: types.string
    })
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<{ a: string } | undefined>(value)
    }
  })
})

describe('object record', () => {
  test('base case', () => {
    const t = types.object.record(types.number)
    const value: any = { 'a': 1 }
    expect(satisfy(t, value)).toBe(true)

    if (satisfy(t, value)) {
      assertType<Record<string, number>>(value)
    }
  })
})

describe('tuple', () => {
  test('single value', () => {
    const t = types.tuple.create(types.number)
    expect(satisfy(t, [0])).toBe(true)
    expect(satisfy(t, [''])).toBe(false)
    expect(satisfy(t, [0, 1])).toBe(false)

    const value: unknown = [1]
    if (satisfy(t, value)) {
      assertType<[number]>(value)
    }
  })
  test('two values', () => {
    const t = types.tuple.create(types.number, types.string)
    expect(satisfy(t, [0, ''])).toBe(true)
    expect(satisfy(t, [0])).toBe(false)
    expect(satisfy(t, [0, '', true])).toBe(false)

    const value: unknown = [1, 'a']
    if (satisfy(t, value)) {
      assertType<[number, string]>(value)
    }
  })
  test('optional', () => {
    const t = types.tuple.optional.create(types.boolean)
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<[boolean] | undefined>(value)
    }
  })
  test('optional create', () => {
    const t = types.tuple.optional.create(types.boolean)
    expect(satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (satisfy(t, value)) {
      assertType<[boolean] | undefined>(value)
    }
  })
})

// test('if condition', () => {
//   types.If(types.boolean.false, {}, false as const)
// })

function notSatisfyTypesOtherThan(type: types.AllTypes, ...excepts: any[]) {
  const values = [undefined, null, true, false, 0, 1, 0n, 1n, '', 'a', [], ['a'], {}, { a: 1 }, Symbol(), Symbol.for('a')]
  values.forEach(v => {
    if (!excepts.some(e => satisfies(v, e))) {
      expect(satisfy(type, v))
    }
  })
}
