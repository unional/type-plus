import { isType, Types } from './typeCheckers'
import { assertType } from './assertType'

describe('isType()', () => {
  test('undefined', () => {
    expect(isType(Types.Undefined, undefined)).toBe(true)
    expect(isType(Types.Undefined, null)).toBe(false)

    const x: unknown = undefined
    if (isType(Types.Undefined, x)) {
      assertType<undefined>(x)
    }
  })

  test('boolean', () => {
    expect(isType(Types.Boolean, undefined)).toBe(false)
    expect(isType(Types.Boolean, true)).toBe(true)
    expect(isType(Types.Boolean, false)).toBe(true)

    const x: unknown = true
    if (isType(Types.Boolean, x)) {
      assertType<boolean>(x)
    }
  })

  test('number', () => {
    expect(isType(Types.Number, true)).toBe(false)
    expect(isType(Types.Number, 0)).toBe(true)
    expect(isType(Types.Number, 1)).toBe(true)

    const x: unknown = 2
    if (isType(Types.Number, x)) {
      assertType<number>(x)
    }
  })

  test('string', () => {
    expect(isType(Types.String, 1)).toBe(false)
    expect(isType(Types.String, '')).toBe(true)
    expect(isType(Types.String, 'a')).toBe(true)

    const x: unknown = 'b'
    if (isType(Types.String, x)) {
      assertType<string>(x)
    }
  })

  test('bigint', () => {
    expect(isType(Types.BigInt, true)).toBe(false)
    expect(isType(Types.BigInt, 0n)).toBe(true)
    expect(isType(Types.BigInt, 1n)).toBe(true)

    const x: unknown = 2n
    if (isType(Types.BigInt, x)) {
      assertType<bigint>(x)
    }
  })

  test('symbol', () => {
    expect(isType(Types.Symbol, true)).toBe(false)
    expect(isType(Types.Symbol, Symbol())).toBe(true)
    expect(isType(Types.Symbol, Symbol.for('abc'))).toBe(true)

    const x: unknown = Symbol()
    if (isType(Types.Symbol, x)) {
      assertType<symbol>(x)
    }
  })

  test('null', () => {
    expect(isType(Types.Null, true)).toBe(false)
    expect(isType(Types.Null, null)).toBe(true)

    const x: unknown = null
    if (isType(Types.Null, x)) {
      assertType<null>(x)
    }
  })

  test('union of one type gets that type', () => {
    const u = Types.union(Types.Undefined)
    expect(u).toBe(Types.Undefined)
    assertType<typeof Types.Undefined>(u)
  })

  // test('union of same types gets the same type', () => {
  //   const u = Types.union(Types.Undefined, Types.Undefined)
  //   expect(isType(u, undefined)).toBe(true)
  //   assertType<typeof Types.Undefined>(u)

  //   const t: Types.UnionType<[typeof Types.Undefined]> = {} as any
  //   const x: unknown = undefined
  //   if (isType(t, x)) {
  //     assertType<undefined>(x)
  //   }
  //   // if (isType(Types.union(Types.Undefined, Types.Undefined), x)) {
  //   //   assertType<undefined>(x)
  //   // }
  // })

  test('union of two different types', () => {
    const t = Types.union(Types.Undefined, Types.Null)
    expect(isType(t, undefined)).toBe(true)
    expect(isType(t, null)).toBe(true)
    expect(isType(t, 1)).toBe(false)
  })

  test('union of multiple types', () => {
    const t = Types.union(Types.Undefined, Types.Null, Types.Boolean, Types.String)
    expect(isType(t, undefined)).toBe(true)
    expect(isType(t, null)).toBe(true)
    expect(isType(t, false)).toBe(true)
    expect(isType(t, '')).toBe(true)
    expect(isType(t, 1)).toBe(false)
  })

  test('union with union', () => {
    const t = Types.union(Types.Undefined, Types.union(Types.Null, Types.Boolean), Types.String)
    expect(isType(t, undefined)).toBe(true)
    expect(isType(t, null)).toBe(true)
    expect(isType(t, false)).toBe(true)
    expect(isType(t, '')).toBe(true)
    expect(isType(t, 1)).toBe(false)
  })
})
