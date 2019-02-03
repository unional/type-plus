import { typeAssert } from '.';

describe('isUndefined()', () => {
  test('ensure the input type is undefined and nothing else', () => {
    typeAssert.isUndefined(undefined)

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
    typeAssert.noUndefined(null)
    typeAssert.noUndefined(1)
    typeAssert.noUndefined(true)
    typeAssert.noUndefined('a')
    typeAssert.noUndefined([])
    typeAssert.noUndefined({})

    // These fails
    // typeAssert.noUndefined(undefined)
    // typeAssert.noUndefined(1 as undefined | number)
  })
})

describe('isNull()', () => {
  test('ensure the input type is null and nothing else', () => {
    typeAssert.isNull(null)

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
    typeAssert.noNull(undefined)
    typeAssert.noNull(1)
    typeAssert.noNull(true)
    typeAssert.noNull('a')
    typeAssert.noNull([])
    typeAssert.noNull({})

    // These fails
    // typeAssert.noNull(null)
    // typeAssert.noNull(undefined as undefined | null)
  })
})

describe('isNumber()', () => {
  test('ensure the input type is number and nothing else', () => {
    typeAssert.isNumber(0)

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
    typeAssert.noNumber(undefined)
    typeAssert.noNumber(null)
    typeAssert.noNumber(true)
    typeAssert.noNumber('a')
    typeAssert.noNumber([])
    typeAssert.noNumber({})

    // These fails
    // typeAssert.noNumber(1)
    // typeAssert.noNumber(1 as number | undefined)
  })
})

describe('isBoolean()', () => {
  test('ensure the input type is boolean and nothing else', () => {
    typeAssert.isBoolean(false)

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
    typeAssert.noBoolean(undefined)
    typeAssert.noBoolean(null)
    typeAssert.noBoolean(1)
    typeAssert.noBoolean('a')
    typeAssert.noBoolean([])
    typeAssert.noBoolean({})

    // These fails
    // typeAssert.noBoolean(true)
    // typeAssert.noBoolean(true as boolean | undefined)
  })
})

describe('isString()', () => {
  test('ensure the input type is boolean and nothing else', () => {
    typeAssert.isString('a')

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
    typeAssert.noString(undefined)
    typeAssert.noString(null)
    typeAssert.noString(1)
    typeAssert.noString(true)
    typeAssert.noString([])
    typeAssert.noString({})

    // These fails
    // typeAssert.noString('a')
    // typeAssert.noString('a' as string | undefined)
  })
})
