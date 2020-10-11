import a from 'assertron'
import { assertType, assignability } from '..'

describe('assertType()', () => {
  test('input satisfies specified type', () => {
    const subject = { a: 1, b: 2 } as const
    assertType<{ a: 1 }>(subject)
  })
  test('Specify T in the validate function', () => {
    const s: unknown = false
    assertType(s, (s: boolean) => typeof s === 'boolean')
    assertType<boolean>(s)
  })
  test('Specify T at type declaration', () => {
    const s: unknown = false
    assertType<boolean>(s, s => typeof s === 'boolean')
    assertType<boolean>(s)
  })
  test('error messge contains info from validator', () => {
    const s: unknown = 1
    a.throws(() => assertType(s, s => typeof s === 'boolean'), e => /subject fails to satisfy s => typeof s === 'boolean'/.test(e))
  })
  test('Class as validator', () => {
    const s: unknown = new Error()
    assertType(s, Error)
    assertType<Error>(s)
  })
  test('Class as validator fails', () => {
    class Foo { }
    const s: unknown = 1
    a.throws(() => assertType(s, Foo), e => /subject fails to satisfy class Foo{}/.test(e.message))
  })
  test('subject can be type any', () => {
    const s: any = false
    assertType<boolean>(s, s => typeof s === 'boolean')
    assertType<boolean>(s)
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
    // assertType.isUndefined(undefined as unknown)
  })
  test('not undefined throws TypeError', () => {
    a.throws(() => assertType.isUndefined(1 as any), TypeError)
  })
  test('narrow any to undefined', () => {
    const x: any = undefined
    assertType.isUndefined(x)
    assertType<false>(assignability<null>()(x))
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
    assertType.noUndefined(1 as unknown)
  })
  test('undefined throws TypeError', () => {
    a.throws(() => assertType.noUndefined(undefined as any), TypeError)
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
  test('not null throws TypeError', () => {
    a.throws(() => assertType.isNull(1 as any), TypeError)
  })
  test('narrow any to null', () => {
    const x: any = null
    assertType.isNull(x)
    assertType<false>(assignability<undefined>()(x))
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
  test('null throws TypeError', () => {
    a.throws(() => assertType.noNull(null as any), TypeError)
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
    // assertType.isNumber(1 as unknown)
  })
  test('not number throws TypeError', () => {
    a.throws(() => assertType.isNumber(undefined as any), TypeError)
  })
  test('narrow any to number', () => {
    const x: any = 1
    assertType.isNumber(x)
    assertType<false>(assignability<undefined>()(x))
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
  test('number throws TypeError', () => {
    a.throws(() => assertType.noNumber(1 as any), TypeError)
  })
})

describe('isBoolean()', () => {
  test('ensure the input type is boolean and nothing else', () => {
    assertType.isBoolean(true)
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
  test('not boolean throws TypeError', () => {
    a.throws(() => assertType.isBoolean(undefined as any), TypeError)
  })
  test('narrow any to boolean', () => {
    const x: any = true
    assertType.isBoolean(x)
    assertType<false>(assignability<undefined>()(x))
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
  test('boolean throws TypeError', () => {
    a.throws(() => assertType.noBoolean(true as any), TypeError)
  })
})

describe('isTrue()', () => {
  test('ensure the input type is true and nothing else', () => {
    assertType.isTrue(true)

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
  test('not true throws TypeError', () => {
    a.throws(() => assertType.isTrue(undefined as any), TypeError)
  })
  test('narrow any to true', () => {
    const x: any = true
    assertType.isTrue(x)
    assertType<false>(assignability<undefined>()(x))
  })
})

describe('noTrue()', () => {
  test('ensure the input type does not contain boolean', () => {
    assertType.noTrue(false)
    assertType.noTrue(undefined)
    assertType.noTrue(null)
    assertType.noTrue(1)
    assertType.noTrue('a')
    assertType.noTrue([])
    assertType.noTrue({})

    // These fails
    // assertType.noTrue(true)
    // assertType.noTrue(true as true | undefined)
    // assertType.noTrue(true as boolean | undefined)
  })
  test('true throws TypeError', () => {
    a.throws(() => assertType.noTrue(true as any), TypeError)
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
  test('boolean throws TypeError', () => {
    a.throws(() => assertType.noBoolean(true as any), TypeError)
  })
})

describe('noFalse()', () => {
  test('ensure the input type does not contain boolean', () => {
    assertType.noFalse(true)
    assertType.noFalse(undefined)
    assertType.noFalse(null)
    assertType.noFalse(1)
    assertType.noFalse('a')
    assertType.noFalse([])
    assertType.noFalse({})

    // These fails
    // assertType.noFalse(false)
    // assertType.noFalse(false as false | undefined)
    // assertType.noFalse(false as boolean | undefined)
  })
  test('false throws TypeError', () => {
    a.throws(() => assertType.noFalse(false as any), TypeError)
  })
})

describe('isString()', () => {
  test('ensure the input type is string and nothing else', () => {
    assertType.isString('a')

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
  test('not string throws TypeError', () => {
    a.throws(() => assertType.isString(undefined as any), TypeError)
  })
  test('narrow any to string', () => {
    const x: any = ''
    assertType.isString(x)
    assertType<false>(assignability<undefined>()(x))
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
  test('string throws TypeError', () => {
    a.throws(() => assertType.noString('' as any), TypeError)
  })
})

describe('isFunction()', () => {
  test('ensure the input type is function and nothing else', () => {
    assertType.isFunction(() => { })
    assertType.isFunction(function () { })

    // These fails
    // assertType.isFunction(undefined)
    // assertType.isFunction(null)
    // assertType.isFunction(1)
    // assertType.isFunction('a')
    // assertType.isFunction([])
    // assertType.isFunction({})
    // assertType.isFunction((() => { }) as AnyFunction | undefined)
  })
  test('not function throws TypeError', () => {
    a.throws(() => assertType.isFunction(undefined as any), TypeError)
  })
  test('narrow any to function', () => {
    const x: any = () => { }
    assertType.isFunction(x)
    assertType<false>(assignability<undefined>()(x))
  })
})

describe('noFunction()', () => {
  test('ensure the input type does not contain function', () => {
    assertType.noFunction(undefined)
    assertType.noFunction(null)
    assertType.noFunction(1)
    assertType.noFunction('a')
    assertType.noFunction([])
    assertType.noFunction({})

    // These fails
    // assertType.noFunction(() => {})
    // assertType.noFunction((() => {}) as AnyFunction | undefined)
  })
  test('function throws TypeError', () => {
    a.throws(() => assertType.noFunction((() => { }) as any), TypeError)
  })
})

describe('isError()', () => {
  test('ensure the input type is instance of Error and nothing else', () => {
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

  test('not error throws TypeError', () => {
    a.throws(() => assertType.isError(undefined as any), TypeError)
  })
  test('narrow any to Error', () => {
    const x: any = new Error('hello')
    assertType.isError(x)
    assertType<false>(assignability<undefined>()(x))
  })
})

describe('noError()', () => {
  test('ensure the input type does not contain Error', () => {
    assertType.noError(undefined)
    assertType.noError(null)
    assertType.noError(1)
    assertType.noError('a')
    assertType.noError([])
    assertType.noError({})

    // These fails
    // assertType.noError(new Error('a'))
    // assertType.noError(new Error('a') as Error | undefined)
  })
  test('error instance throws TypeError', () => {
    a.throws(() => assertType.noError(new Error('a') as any), TypeError)
  })
})

describe('custom', () => {
  test('specify T in the validator', () => {
    const isBool = assertType.custom((s: boolean) => typeof s === 'boolean')
    const s: unknown = false
    expect(isBool(s)).toBe(undefined)
  })
  test('specify T at type declaration', () => {
    const isBool = assertType.custom<boolean>(s => typeof s === 'boolean')
    const s: unknown = false
    expect(isBool(s)).toBe(undefined)
  })
})
