import a from 'assertron'
import { assertType, typeAssertion } from '..'

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

    a.throws(() => assertType.isUndefined(1 as any), TypeError)
    const x: any = undefined
    assertType.isUndefined(x)
    // `x` is narrowed to `undefined` here
    assertType.isUndefined(x)

    // These fails
    // assertType.isUndefined(null)
    // assertType.isUndefined(1)
    // assertType.isUndefined(true)
    // assertType.isUndefined('a')
    // assertType.isUndefined([])
    // assertType.isUndefined({})
    // assertType.isUndefined(undefined as undefined | number)
    // assertType.isUndefined(undefined as unknown)
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

    a.throws(() => assertType.isNull(1 as any), TypeError)
    const x: any = null
    assertType.isNull(x)
    // `x` is narrowed to `null` here
    assertType.isNull(x)

    // These fails
    // assertType.isNull(undefined)
    // assertType.isNull(1)
    // assertType.isNull(true)
    // assertType.isNull('a')
    // assertType.isNull([])
    // assertType.isNull({})
    // assertType.isNull(null as null | undefined)
    // assertType.isNull(null as unknown)
  })
})

describe('noNull()', () => {
  test('ensure the input type does not contain null', () => {
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

    a.throws(() => assertType.isNumber(undefined as any), TypeError)
    const x: any = 1
    assertType.isNumber(x)
    // `x` is narrowed to `number` here
    assertType.isNumber(x)

    // These fails
    // assertType.isNumber(undefined)
    // assertType.isNumber(null)
    // assertType.isNumber(true)
    // assertType.isNumber('a')
    // assertType.isNumber([])
    // assertType.isNumber({})
    // assertType.isNumber(1 as number | undefined)
    // assertType.isNumber(1 as unknown)
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

    a.throws(() => assertType.isBoolean(1 as any), TypeError)
    const x: any = false
    assertType.isBoolean(x)
    // `x` is narrowed to `boolean` here
    assertType.isBoolean(x)

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

describe('isTrue()', () => {
  test('ensure the input type is true and nothing else', () => {
    assertType.isTrue(true)

    a.throws(() => assertType.isTrue(false as any), TypeError)
    const x: any = true
    assertType.isTrue(x)
    // `x` is narrowed to `true` here
    assertType.isTrue(x)

    // These fails
    // assertType.isTrue(undefined)
    // assertType.isTrue(null)
    // assertType.isTrue(1)
    // assertType.isTrue('a')
    // assertType.isTrue(false)
    // assertType.isTrue([])
    // assertType.isTrue({})
    // assertType.isTrue(true as true | undefined)
    // assertType.isTrue(true as unknown)
  })
})

describe('isFalse()', () => {
  test('ensure the input type is false and nothing else', () => {
    assertType.isFalse(false)

    a.throws(() => assertType.isFalse(true as any), TypeError)
    const x: any = false
    assertType.isFalse(x)
    // `x` is narrowed to `true` here
    assertType.isFalse(x)

    // These fails
    // assertType.isFalse(undefined)
    // assertType.isFalse(null)
    // assertType.isFalse(1)
    // assertType.isFalse('a')
    // assertType.isFalse(false)
    // assertType.isFalse([])
    // assertType.isFalse({})
    // assertType.isFalse(false as false | undefined)
    // assertType.isFalse(false as unknown)
  })
})

describe('isString()', () => {
  test('ensure the input type is string and nothing else', () => {
    assertType.isString('a')

    a.throws(() => assertType.isString(false as any), TypeError)
    const x: any = ''
    assertType.isString(x)
    // `x` is narrowed to `true` here
    assertType.isString(x)

    // These fails
    // assertType.isString(undefined)
    // assertType.isString(null)
    // assertType.isString(1)
    // assertType.isString(true)
    // assertType.isString([])
    // assertType.isString({})
    // assertType.isString('a' as string | undefined)
    // assertType.isString('a' as unknown)
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

describe('isNever()', () => {
  test('ensure the input type is never and nothing else', () => {
    assertType.isNever(true as never)

    // These fails
    // assertType.isNever(undefined)
    // assertType.isNever(null)
    // assertType.isNever(1)
    // assertType.isNever(true)
    // assertType.isNever([])
    // assertType.isNever({})
    // assertType.isNever('a' as unknown)
  })
})

describe('isError()', () => {
  test('ensure the input type is instance of Error and nother else', () => {
    assertType.isError(new Error('x'))

    a.throws(() => assertType.isError(false as any), TypeError)
    const x: any = new Error()
    assertType.isError(x)
    // `x` is narrowed to `true` here
    assertType.isError(x)

    // These fails
    // assertType.isError(undefined)
    // assertType.isError(null)
    // assertType.isError(1)
    // assertType.isError(true)
    // assertType.isError([])
    // assertType.isError({})
    // assertType.isError('a')
    // assertType.isError(new Error() as Error | undefined)
    // assertType.isError(new Error() as unknown)
  })

  // test('ensure the input type is E', () => {
  //   const ee = new EvalError() as unknown
  //   assertUnknown.isError<EvalError>(ee)
  //   typeAssertion<EvalError>()(ee)
  // })
})
