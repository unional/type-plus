import { satisfies } from 'satisfier'
import { assertType, Equal } from '../index.js'
import * as T from './index.js'

describe('undefined', () => {
  test('satisfies only undefined', () => {
    expect(T.satisfy(T.undefined, undefined)).toBe(true)
    notSatisfyTypesOtherThan(T.undefined, undefined)

    const value: unknown = undefined
    if (T.satisfy(T.undefined, value)) {
      assertType<undefined>(value)
    }
  })
})

describe('null', () => {
  test('satisfies only null', () => {
    expect(T.satisfy(T.null, null)).toBe(true)
    notSatisfyTypesOtherThan(T.null, null)

    const value: unknown = null
    if (T.satisfy(T.null, value)) {
      assertType<null>(value)
    }
  })
  test('optional', () => {
    const t = T.null.optional
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<null | undefined>(value)
    }
  })
})

describe('boolean', () => {
  test('base type satisfies both true and false', () => {
    expect(T.satisfy(T.boolean, true)).toBe(true)
    expect(T.satisfy(T.boolean, false)).toBe(true)
    notSatisfyTypesOtherThan(T.boolean, true, false)

    const value: unknown = undefined
    if (T.satisfy(T.boolean, value)) {
      assertType<boolean>(value)
    }
  })
  test('true', () => {
    expect(T.satisfy(T.boolean.true, true)).toBe(true)
    notSatisfyTypesOtherThan(T.boolean.true, true)

    const value: unknown = true
    if (T.satisfy(T.boolean.true, value)) {
      assertType<true>(value)
    }
  })
  test('false', () => {
    expect(T.satisfy(T.boolean.false, false)).toBe(true)
    notSatisfyTypesOtherThan(T.boolean.false, false)

    const value: unknown = false
    if (T.satisfy(T.boolean.false, value)) {
      assertType<false>(value)
    }
  })
  test('true does not satisfy False', () => {
    expect(T.satisfy(T.boolean.false, true)).toBe(false)
  })
  test('false does not satisfy True', () => {
    expect(T.satisfy(T.boolean.true, false)).toBe(false)
  })
  test('optional', () => {
    const t = T.boolean.optional
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<boolean | undefined>(value)
    }
  })
  test('optional create', () => {
    const t = T.boolean.optional.create(true)
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<true | undefined>(value)
    }
  })
})

describe('number', () => {
  test('base type satisfy all numbers', () => {
    expect(T.satisfy(T.number, 0)).toBe(true)
    expect(T.satisfy(T.number, -1)).toBe(true)
    expect(T.satisfy(T.number, 1)).toBe(true)
    notSatisfyTypesOtherThan(T.number, -1, 0, 1)

    const value: unknown = 0
    if (T.satisfy(T.number, value)) {
      assertType<number>(value)
      assertType.isTrue(true as Equal<number, typeof value>)
      assertType.isFalse(false as Equal<0, typeof value>)
    }
  })
  test('0', () => {
    expect(T.satisfy(T.number.create(0), 0)).toBe(true)
    notSatisfyTypesOtherThan(T.number.create(0), 0)

    const value: unknown = 0
    if (T.satisfy(T.number.create(0), value)) {
      assertType<0>(value)
    }
  })
  test('1', () => {
    expect(T.satisfy(T.number.create(1), 1)).toBe(true)
    notSatisfyTypesOtherThan(T.number.create(1), 1)

    const value: unknown = 1
    if (T.satisfy(T.number.create(1), value)) {
      assertType<1>(value)
    }
  })
  test('0 does not satisfy 1', () => {
    expect(T.satisfy(T.number.create(1), 0)).toBe(false)
  })
  test('1 does not satisfy 0', () => {
    expect(T.satisfy(T.number.create(0), 1)).toBe(false)
  })
  test('optional', () => {
    const t = T.number.optional
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<number | undefined>(value)
    }
  })
  test('optional const', () => {
    const t = T.number.optional.create(1)
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<1 | undefined>(value)
    }
  })
  test('list: single', () => {
    const t = T.number.list(0)
    const value: unknown = 0

    expect(T.satisfy(t, value)).toBe(true)
    if (T.satisfy(t, value)) {
      assertType<0>(value)
    }
  })
  test('list: multiple', () => {
    const t = T.number.list(1, 2, 3)
    const value: unknown = 1

    expect(T.satisfy(t, value)).toBe(true)
    if (T.satisfy(t, value)) {
      assertType<1 | 2 | 3>(value)
    }
  })
  test('optional.list: multiple', () => {
    const t = T.number.optional.list(1, 2, 3)
    const value: unknown = 1

    expect(T.satisfy(t, value)).toBe(true)
    if (T.satisfy(t, value)) {
      assertType<1 | 2 | 3 | undefined>(value)
    }
  })
})

describe('string', () => {
  test('base type satisfies any string', () => {
    expect(T.satisfy(T.string, '')).toBe(true)
    expect(T.satisfy(T.string, 'a')).toBe(true)
    notSatisfyTypesOtherThan(T.string, '', 'a')

    const value: unknown = ''
    if (T.satisfy(T.string, value)) {
      assertType<string>(value)
      assertType.isTrue(true as Equal<string, typeof value>)
      assertType.isFalse(false as Equal<'', typeof value>)
    }
  })
  test(`''`, () => {
    expect(T.satisfy(T.string, '')).toBe(true)
    notSatisfyTypesOtherThan(T.string, '')

    const value: unknown = ''
    if (T.satisfy(T.string.create(''), value)) {
      assertType<''>(value)
    }
  })
  test(`'a'`, () => {
    expect(T.satisfy(T.string, 'a')).toBe(true)
    notSatisfyTypesOtherThan(T.string, '', 'a')

    const value: unknown = 'a'
    if (T.satisfy(T.string.create('a'), value)) {
      assertType<'a'>(value)
    }
  })
  test(`'' does not satisfy 'a'`, () => {
    expect(T.satisfy(T.string.create('a'), '')).toBe(false)
  })
  test(`'a' does not satisfy ''`, () => {
    expect(T.satisfy(T.string.create(''), 'a')).toBe(false)
  })
  test('optional', () => {
    const t = T.string.optional
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<string | undefined>(value)
    }
  })
  test('optional const', () => {
    const t = T.string.optional.create('a')
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<'a' | undefined>(value)
    }
  })
  test('list: single', () => {
    const t = T.string.list('a')
    const value: unknown = 'a'

    expect(T.satisfy(t, value)).toBe(true)
    if (T.satisfy(t, value)) {
      assertType<'a'>(value)
    }
  })
  test('list: multiple', () => {
    const t = T.string.list('1', '2', '3')
    const value: unknown = '1'

    expect(T.satisfy(t, value)).toBe(true)
    if (T.satisfy(t, value)) {
      assertType<'1' | '2' | '3'>(value)
    }
  })
  test('optional list: multiple', () => {
    const t = T.string.optional.list('1', '2', '3')
    const value: unknown = '1'

    expect(T.satisfy(t, value)).toBe(true)
    if (T.satisfy(t, value)) {
      assertType<'1' | '2' | '3' | undefined>(value)
    }
  })
})

describe('bigint', () => {
  // test('bigint', () => {
  //   expect(T.satisfy(T.bigint, 0n)).toBe(true)
  //   notSatisfyTypesOtherThan(T.bigint, 0n, 1n)

  //   const value: unknown = 0n
  //   if (T.satisfy(T.bigint, value)) {
  //     assertType<bigint>(value)
  //     assertType.isFalse(assignability<0>()(value))
  //   }
  // })

  // test('bigint:0', () => {
  //   expect(T.satisfy(T.bigint.create(0n), 0n)).toBe(true)
  //   notSatisfyTypesOtherThan(T.bigint.create(0n), 0n)

  //   const value: unknown = 0n
  //   if (T.satisfy(T.bigint.create(0n), value)) {
  //     assertType<0n>(value)
  //   }
  // })

  // test('bigint:1', () => {
  //   expect(T.satisfy(T.bigint.create(1n), 1n)).toBe(true)
  //   notSatisfyTypesOtherThan(T.bigint.create(1n), 1n)

  //   const value: unknown = 1n
  //   if (T.satisfy(T.bigint.create(1n), value)) {
  //     assertType<1n>(value)
  //   }
  // })

  // test('0n not satisfy 1n', () => {
  //   expect(T.satisfy(T.bigint.create(1n), 0n)).toBe(false)
  // })

  // test('1n not satisfy 0n', () => {
  //   expect(T.satisfy(T.bigint.create(0n), 1n)).toBe(false)
  // })
})

describe('symbol', () => {
  test('base type satisfies any symbol', () => {
    expect(T.satisfy(T.symbol, Symbol())).toBe(true)
    notSatisfyTypesOtherThan(T.symbol, Symbol())

    const value: unknown = Symbol()
    if (T.satisfy(T.symbol, value)) {
      assertType<symbol>(value)
    }
  })
  test('optional', () => {
    const t = T.symbol.optional
    const value: unknown = Symbol()

    expect(T.satisfy(t, value)).toBe(true)

    if (T.satisfy(t, value)) {
      assertType<symbol | undefined>(value)
    }
  })
})

describe('union', () => {
  test('single type gets the type back', () => {
    const t = T.union.create(T.boolean)
    assertType<T.Boolean>(t)
  })
  test('on two types', () => {
    const t = T.union.create(T.boolean, T.number)
    expect(T.satisfy(t, 0)).toBe(true)
    expect(T.satisfy(t, false)).toBe(true)

    const value: unknown = 0
    if (T.satisfy(t, value)) {
      assertType<boolean | number>(value)
    }
  })
  test('on multiple primitive types', () => {
    const t = T.union.create(T.boolean, T.null, T.number)
    expect(T.satisfy(t, false)).toBe(true)

    const value: unknown = true
    if (T.satisfy(t, value)) {
      assertType<boolean | null | number>(value)
    }
  })
  test('nested union is flatten', () => {
    const t = T.union.create(T.union.create(T.boolean, T.null), T.string)
    expect(T.satisfy(t, false)).toBe(true)
    const value: unknown = true
    if (T.satisfy(t, value)) {
      assertType<boolean | string | null>(value)
    }
  })
  test.todo('remove duplicates')
  test('optional create', () => {
    const t = T.union.optional.create(T.boolean)
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<boolean | undefined>(value)
    }
  })
})

describe('array', () => {
  test('base type satisfies any array and type guard it to any[]', () => {
    expect(T.satisfy(T.array, [])).toBe(true)
    expect(T.satisfy(T.array, ['a'])).toBe(true)

    const value: unknown = []
    if (T.satisfy(T.array, value)) {
      // Note that this test is weak.
      // I don't have a good way to nail it down as it is a top type.
      assertType<any[]>(value)
    }
  })
  test('base type does not satisfy non-array', () => {
    notSatisfyTypesOtherThan(T.array, [], ['a'])
  })
  test('unknown type assert result to unknown[]', () => {
    expect(T.satisfy(T.array.unknown, [])).toBe(true)
    expect(T.satisfy(T.array.unknown, ['a'])).toBe(true)

    const value: unknown = []
    if (T.satisfy(T.array.unknown, value)) {
      // Note that this test is weak.
      // I don't have a good way to nail it down as it is a top type.
      assertType<unknown[]>(value)
    }
  })
  test('unknown type does not satisfy non-array', () => {
    notSatisfyTypesOtherThan(T.array.unknown, [], ['a'])
  })
  test('specific type', () => {
    const t = T.array.create(T.number)
    expect(T.satisfy(t, [])).toBe(true)
    expect(T.satisfy(t, [0])).toBe(true)
    expect(T.satisfy(t, [1, 2])).toBe(true)
    expect(T.satisfy(t, ['a'])).toBe(false)
    expect(T.satisfy(t, [1, 'a'])).toBe(false)
    expect(T.satisfy(t, ['a', 1])).toBe(false)

    const value: unknown = ['a']
    if (T.satisfy(t, value)) {
      assertType<number[]>(value)
    }
  })
  test(`array's value type can be union type`, () => {
    const t = T.array.create(T.union.create(T.number, T.boolean))
    expect(T.satisfy(t, [])).toBe(true)
    expect(T.satisfy(t, [0])).toBe(true)
    expect(T.satisfy(t, [false])).toBe(true)
    expect(T.satisfy(t, [false, 0])).toBe(true)
    expect(T.satisfy(t, [0, false, ''])).toBe(false)

    const value: unknown = [0, false]
    if (T.satisfy(t, value)) {
      assertType<Array<number | boolean>>(value)
    }
  })
  test('optional', () => {
    const t = T.array.optional
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<any[] | undefined>(value)
    }
  })
  test('optional create', () => {
    const t = T.array.optional.create(T.string)
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<string[] | undefined>(value)
    }
  })
})

describe('tuple', () => {
  test('single value', () => {
    const t = T.tuple.create(T.number)
    expect(T.satisfy(t, [0])).toBe(true)
    expect(T.satisfy(t, [''])).toBe(false)

    const value: unknown = [1]
    if (T.satisfy(t, value)) {
      assertType<[number]>(value)
    }
  })
  test('two values', () => {
    const t = T.tuple.create(T.number, T.string)
    expect(T.satisfy(t, [0, ''])).toBe(true)
    expect(T.satisfy(t, [0])).toBe(false)

    const value: unknown = [1, 'a']
    if (T.satisfy(t, value)) {
      assertType<[number, string]>(value)
    }
  })
  test('pass with more values than what specified in the type', () => {
    expect(T.satisfy(T.tuple.create(T.number), [1, 'a'])).toBe(true)
  })
  test('optional', () => {
    const t = T.tuple.optional.create(T.boolean)
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<[boolean] | undefined>(value)
    }
  })
})

describe('object', () => {
  test('base type satisfies any object', () => {
    expect(T.satisfy(T.object, {})).toBe(true)
    expect(T.satisfy(T.object, { a: 1 })).toBe(true)
    expect(T.satisfy(T.object, { 0: 0 })).toBe(true)

    const value: unknown = { a: 1 }
    if (T.satisfy(T.object, value)) {
      assertType<Record<string, any>>(value)
    }
  })
  test('base type does not satisfy non-object including array and null', () => {
    notSatisfyTypesOtherThan(T.object, {}, { a: 1 })
  })
  test('single prop', () => {
    const t = T.object.create({ a: T.number })
    expect(T.satisfy(t, { a: 0 })).toBe(true)
    expect(T.satisfy(t, { a: 1 })).toBe(true)

    const value: unknown = { a: 1 }
    if (T.satisfy(t, value)) {
      assertType<{ a: number }>(value)
    }
  })
  test('two props', () => {
    const t = T.object.create({
      a: T.number.create(1),
      b: T.string
    })
    expect(T.satisfy(t, { a: 1, b: '' })).toBe(true)
    expect(T.satisfy(t, { a: 1, b: 'b' })).toBe(true)

    const value: unknown = { a: 1, b: '' }
    if (T.satisfy(t, value)) {
      assertType<{ a: 1, b: string }>(value)
    }
  })
  test('props with union', () => {
    const t = T.object.create({
      a: T.union.create(T.number.create(1), T.boolean.true),
      b: T.string
    })
    expect(T.satisfy(t, { a: 1, b: '' })).toBe(true)
    expect(T.satisfy(t, { a: true, b: '' })).toBe(true)
    expect(T.satisfy(t, { a: false, b: '' })).toBe(false)

    const value: unknown = { a: 1, b: '' }
    if (T.satisfy(t, value)) {
      assertType<{ a: true | 1, b: string }>(value)
    }
  })
  test('nested object', () => {
    const t = T.object.create({
      a: T.object.create({
        b: T.number
      })
    })
    expect(T.satisfy(t, { a: { b: 0 } })).toBe(true)

    const value: unknown = { a: { b: 0 } }
    if (T.satisfy(t, value)) {
      assertType<{ a: { b: number } }>(value)
    }
  })
  test('keys is string + number + symbol', () => {
    // technically empty string is not a valid key.
    // maybe we can do a disjoint or something
    expect(T.satisfy(T.keys, '')).toBe(true)
    expect(T.satisfy(T.keys, 'a')).toBe(true)
    expect(T.satisfy(T.keys, 0)).toBe(true)
    expect(T.satisfy(T.keys, Symbol.for('abc'))).toBe(true)
  })
  test('optional', () => {
    const t = T.object.optional
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<Record<string, any> | undefined>(value)
    }
  })
  test('optional create', () => {
    const t = T.object.optional.create({
      a: T.string
    })
    expect(T.satisfy(t, undefined)).toBe(true)

    const value: unknown = undefined
    if (T.satisfy(t, value)) {
      assertType<{ a: string } | undefined>(value)
    }
  })
})

describe('record', () => {
  test('base case', () => {
    const t = T.record.create(T.number)
    const value: any = { 'a': 1 }
    expect(T.satisfy(t, value)).toBe(true)

    if (T.satisfy(t, value)) {
      assertType<Record<string, number>>(value)
    }
  })
  test('base type does not satisfy non-object including array and null', () => {
    notSatisfyTypesOtherThan(T.record.create(T.null), {}, { a: 1 })
  })
})

// test('if condition', () => {
//   T.If(T.boolean.false, {}, false as const)
// })

function notSatisfyTypesOtherThan(type: T.AllType, ...excepts: any[]) {
  const values = [undefined, null, true, false, 0, 1, 0n, 1n, '', 'a', [], ['a'], {}, { a: 1 }, Symbol(), Symbol.for('a')]
  values.forEach(v => {
    if (!excepts.some(e => satisfies(v, e))) {
      expect(T.satisfy(type, v))
    }
  })
}
