import { assertType, typeAssertion } from '.';

describe('assertType()', () => {
  test('input satisfies specified type', () => {
    const subject = { a: 1, b: 2 } as const
    assertType<{ a: 1 }>(subject)
  })
})

describe('typeAssertion()', () => {
  test('create a type assertion function', () => {
    const subject = { a: 1, b: 2 } as const
    typeAssertion<{ a: 1 }>()(subject)
  })
  test('return the actual type, not the assert type', () => {
    const subject = { a: 1, b: 2 } as const
    const actual = typeAssertion<{ a: 1 }>()(subject)
    expect(actual.b).toBe(2)
  })
})

describe('isUndefined()', () => {
  test('ensure the input type is undefined and nothing else', () => {
    assertType.isUndefined(undefined)

    // These fails
    // typeAssert.isUndefined(null)
    // typeAssert.isUndefined(1)
    // typeAssert.isUndefined(true)
    // typeAssert.isUndefined('a')
    // typeAssert.isUndefined([])
    // typeAssert.isUndefined({})
    // typeAssert.isUndefined(undefined as undefined | number)
  })
})

describe('noUndefined()', () => {
  test('ensure the input type does not contain undefined', () => {
    assertType.noUndefined(null)
    assertType.noUndefined(1)
    assertType.noUndefined(true)
    assertType.noUndefined('a')
    assertType.noUndefined([])
    assertType.noUndefined({})

    // These fails
    // typeAssert.noUndefined(undefined)
    // typeAssert.noUndefined(1 as undefined | number)
  })
})

describe('isNull()', () => {
  test('ensure the input type is null and nothing else', () => {
    assertType.isNull(null)

    // These fails
    // typeAssert.isNull(undefined)
    // typeAssert.isNull(1)
    // typeAssert.isNull(true)
    // typeAssert.isNull('a')
    // typeAssert.isNull([])
    // typeAssert.isNull({})
    // typeAssert.isNull(null as null | undefined)
  })
})

describe('noNull()', () => {
  test('ensure the input type does not contain undefined', () => {
    assertType.noNull(undefined)
    assertType.noNull(1)
    assertType.noNull(true)
    assertType.noNull('a')
    assertType.noNull([])
    assertType.noNull({})

    // These fails
    // typeAssert.noNull(null)
    // typeAssert.noNull(undefined as undefined | null)
  })
})

describe('isNumber()', () => {
  test('ensure the input type is number and nothing else', () => {
    assertType.isNumber(0)

    // These fails
    // typeAssert.isNumber(undefined)
    // typeAssert.isNumber(null)
    // typeAssert.isNumber(true)
    // typeAssert.isNumber('a')
    // typeAssert.isNumber([])
    // typeAssert.isNumber({})
    // typeAssert.isNumber(1 as number | undefined)
  })
})

describe('noNumber()', () => {
  test('ensure the input type does not contain number', () => {
    assertType.noNumber(undefined)
    assertType.noNumber(null)
    assertType.noNumber(true)
    assertType.noNumber('a')
    assertType.noNumber([])
    assertType.noNumber({})

    // These fails
    // typeAssert.noNumber(1)
    // typeAssert.noNumber(1 as number | undefined)
  })
})

describe('isBoolean()', () => {
  test('ensure the input type is boolean and nothing else', () => {
    assertType.isBoolean(false)

    // These fails
    // typeAssert.isBoolean(undefined)
    // typeAssert.isBoolean(null)
    // typeAssert.isBoolean(1)
    // typeAssert.isBoolean('a')
    // typeAssert.isBoolean([])
    // typeAssert.isBoolean({})
    // typeAssert.isBoolean(true as boolean | undefined)
  })
})

describe('noBoolean()', () => {
  test('ensure the input type does not contain boolean', () => {
    assertType.noBoolean(undefined)
    assertType.noBoolean(null)
    assertType.noBoolean(1)
    assertType.noBoolean('a')
    assertType.noBoolean([])
    assertType.noBoolean({})

    // These fails
    // typeAssert.noBoolean(true)
    // typeAssert.noBoolean(true as boolean | undefined)
  })
})

describe('isString()', () => {
  test('ensure the input type is boolean and nothing else', () => {
    assertType.isString('a')

    // These fails
    // typeAssert.isString(undefined)
    // typeAssert.isString(null)
    // typeAssert.isString(1)
    // typeAssert.isString(true)
    // typeAssert.isString([])
    // typeAssert.isString({})
    // typeAssert.isString('a' as string | undefined)
  })
})

describe('noString()', () => {
  test('ensure the input type does not contain boolean', () => {
    assertType.noString(undefined)
    assertType.noString(null)
    assertType.noString(1)
    assertType.noString(true)
    assertType.noString([])
    assertType.noString({})

    // These fails
    // typeAssert.noString('a')
    // typeAssert.noString('a' as string | undefined)
  })
})
