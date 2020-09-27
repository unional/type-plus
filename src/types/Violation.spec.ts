import * as T from '.'
import { getPlainViolationsReport, toExpectation } from './Violation'

test.each([
  'bigint',
  'boolean',
  'number',
  'object',
  'string',
  'symbol'
])('any %s violation', (type) => {
  expect(getPlainViolationsReport([{
    path: [],
    expected: { type },
    actual: undefined
  }])).toEqual(`subject expects to be ${type} but is actually undefined`)
})

test('undefined violation (when explicitly require to be undefined)', () => {
  expect(getPlainViolationsReport([{
    path: [],
    expected: toExpectation(T.undefined),
    actual: false
  }])).toEqual(`subject expects to be undefined but is actually false`)
})

test('null violation', () => {
  expect(getPlainViolationsReport([{
    path: [],
    expected: toExpectation(T.null),
    actual: false
  }])).toEqual(`subject expects to be null but is actually false`)
})

describe('boolean', () => {
  test('specific boolean violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.boolean.create(true)),
      actual: false
    }])).toEqual(`subject expects to be true but is actually false`)
  })

  test('optional boolean violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.boolean.optional),
      actual: false
    }])).toEqual(`subject expects to be (boolean | undefined) but is actually false`)
  })

  test('optional specific boolean violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.boolean.optional.false),
      actual: true
    }])).toEqual(`subject expects to be (false | undefined) but is actually true`)
  })
})

describe('number', () => {
  test('specific number violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.number.create(1)),
      actual: false
    }])).toEqual(`subject expects to be 1 but is actually false`)
  })

  test('optional number violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.number.optional),
      actual: false
    }])).toEqual(`subject expects to be (number | undefined) but is actually false`)
  })

  test('optional specific number violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.number.optional.create(2)),
      actual: false
    }])).toEqual(`subject expects to be (2 | undefined) but is actually false`)
  })

  test('number list violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.number.list(1, 2, 3)),
      actual: false
    }])).toEqual(`subject expects to be (1 | 2 | 3) but is actually false`)
  })

  test('optional number list violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.number.optional.list(1, 2, 3)),
      actual: false
    }])).toEqual(`subject expects to be (1 | 2 | 3 | undefined) but is actually false`)
  })
})

describe('string', () => {
  test('specific string violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.string.create('a')),
      actual: false
    }])).toEqual(`subject expects to be 'a' but is actually false`)
  })

  test('optional string violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.string.optional),
      actual: false
    }])).toEqual(`subject expects to be (string | undefined) but is actually false`)
  })

  test('optional specific string violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.string.optional.create('b')),
      actual: false
    }])).toEqual(`subject expects to be ('b' | undefined) but is actually false`)
  })

  test('string list violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.string.list('a', 'b', 'c')),
      actual: false
    }])).toEqual(`subject expects to be ('a' | 'b' | 'c') but is actually false`)
  })

  test('optional string list violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.string.optional.list('a', 'b', 'c')),
      actual: false
    }])).toEqual(`subject expects to be ('a' | 'b' | 'c' | undefined) but is actually false`)
  })
})

describe('array', () => {
  test('base violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: { type: 'array' },
      actual: undefined
    }])).toEqual(`subject expects to be Array<any> but is actually undefined`)
  })
  test('specific array violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.array.create(T.number)),
      actual: false
    }])).toEqual(`subject expects to be Array<number> but is actually false`)
  })
  test('optional array violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.array.optional),
      actual: false
    }])).toEqual(`subject expects to be (Array<any> | undefined) but is actually false`)
  })
  test('optional specific array violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.array.optional.create(T.number)),
      actual: false
    }])).toEqual(`subject expects to be (Array<number> | undefined) but is actually false`)
  })
})

describe('tuple', () => {
  test('specific tuple violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.tuple.create(T.number.create(1), T.string.create('a'))),
      actual: false
    }])).toEqual(`subject expects to be [1,'a'] but is actually false`)
  })
  test('optional specific tuple violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.tuple.optional.create(T.number)),
      actual: false
    }])).toEqual(`subject expects to be ([number] | undefined) but is actually false`)
  })
})

describe('object', () => {
  test('specific object violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.object.create({ a: T.null })),
      actual: false
    }])).toEqual(`subject expects to be { a: null } but is actually false`)
  })
  test('optional specific object violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.object.optional.create({ a: T.object.create({ b: T.string }) })),
      actual: false
    }])).toEqual(`subject expects to be ({ a: { b: string } } | undefined) but is actually false`)
  })
})

describe('record', () => {
  test('specific record violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.record.create(T.null)),
      actual: false
    }])).toEqual(`subject expects to be Record<string, null> but is actually false`)
  })
  test('optional specific record violation', () => {
    expect(getPlainViolationsReport([{
      path: [],
      expected: toExpectation(T.record.optional.create(T.record.create(T.string))),
      actual: false
    }])).toEqual(`subject expects to be (Record<string, Record<string, string>> | undefined) but is actually false`)
  })
})

test.todo('`actual` formatting')
