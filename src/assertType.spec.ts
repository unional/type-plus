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
    // assertType.isUndefined(null)
    // assertType.isUndefined(1)
    // assertType.isUndefined(true)
    // assertType.isUndefined('a')
    // assertType.isUndefined([])
    // assertType.isUndefined({})
    // assertType.isUndefined(undefined as undefined | number)
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
    // assertType.noUndefined(undefined)
    // assertType.noUndefined(1 as undefined | number)
  })
})

describe('isNull()', () => {
  test('ensure the input type is null and nothing else', () => {
    assertType.isNull(null)

    // These fails
    // assertType.isNull(undefined)
    // assertType.isNull(1)
    // assertType.isNull(true)
    // assertType.isNull('a')
    // assertType.isNull([])
    // assertType.isNull({})
    // assertType.isNull(null as null | undefined)
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
    // assertType.noNull(null)
    // assertType.noNull(undefined as undefined | null)
  })
})

describe('isNumber()', () => {
  test('ensure the input type is number and nothing else', () => {
    assertType.isNumber(0)

    // These fails
    // assertType.isNumber(undefined)
    // assertType.isNumber(null)
    // assertType.isNumber(true)
    // assertType.isNumber('a')
    // assertType.isNumber([])
    // assertType.isNumber({})
    // assertType.isNumber(1 as number | undefined)
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
    // assertType.noNumber(1)
    // assertType.noNumber(1 as number | undefined)
  })
})

describe('isBoolean()', () => {
  test('ensure the input type is boolean and nothing else', () => {
    assertType.isBoolean(false)

    // These fails
    // assertType.isBoolean(undefined)
    // assertType.isBoolean(null)
    // assertType.isBoolean(1)
    // assertType.isBoolean('a')
    // assertType.isBoolean([])
    // assertType.isBoolean({})
    // assertType.isBoolean(true as boolean | undefined)
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
    // assertType.noBoolean(true)
    // assertType.noBoolean(true as boolean | undefined)
  })
})

describe('isString()', () => {
  test('ensure the input type is boolean and nothing else', () => {
    assertType.isString('a')

    // These fails
    // assertType.isString(undefined)
    // assertType.isString(null)
    // assertType.isString(1)
    // assertType.isString(true)
    // assertType.isString([])
    // assertType.isString({})
    // assertType.isString('a' as string | undefined)
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
    // assertType.noString('a')
    // assertType.noString('a' as string | undefined)
  })
})
