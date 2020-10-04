import * as T from '.'
import { AllType } from './AllType'
import { analyze } from './analyze'
import { getPlainAnalysisReport } from './getPlainAnalysisReport'

describe.skip('non-strict', () => {
  const options = { strict: false, debug: false }
  test.each([
    'bigint',
    'boolean',
    'number',
    'object',
    'string',
    'symbol'
  ])('valueless %s violation', (type: any) => {
    expect(getPlainAnalysisReport({
      options,
      analysis: { type, value: undefined, fail: true },
      actual: undefined
    })).toEqual(`subject expects to be ${type} but is actually undefined`)
  })

  test('undefined violation (when explicitly require to be undefined)', () => {
    assertReportEquals(options, T.undefined, false,
      `subject expects to be undefined but is actually false`)
  })

  test('null violation', () => {
    assertReportEquals(options, T.null, false,
      `subject expects to be null but is actually false`)
  })

  describe('boolean', () => {
    test('specific boolean violation', () => {
      assertReportEquals(options, T.boolean.true, false,
        `subject expects to be true but is actually false`)
    })

    test('optional boolean violation', () => {
      assertReportEquals(options, T.boolean.optional, null,
        `subject expects to be (boolean | undefined) but is actually null`)
    })

    test('optional specific boolean violation', () => {
      assertReportEquals(options, T.boolean.optional.false, true,
        `subject expects to be (false | undefined) but is actually true`)
    })
  })

  describe('number', () => {
    test('specific number violation', () => {
      assertReportEquals(options, T.number.create(1), false,
        `subject expects to be 1 but is actually false`)
    })

    test('optional number violation', () => {
      assertReportEquals(options, T.number.optional, false,
        `subject expects to be (number | undefined) but is actually false`)
    })

    test('optional specific number violation', () => {
      assertReportEquals(options, T.number.optional.create(2), false,
        `subject expects to be (2 | undefined) but is actually false`)
    })

    test('number list violation', () => {
      assertReportEquals(options, T.number.list(1, 2, 3), false,
        `subject expects to be (1 | 2 | 3) but is actually false`)
    })

    test('optional number list violation', () => {
      assertReportEquals(options, T.number.optional.list(1, 2, 3), false,
        `subject expects to be (1 | 2 | 3 | undefined) but is actually false`)
    })
  })

  describe('string', () => {
    test('specific string violation', () => {
      assertReportEquals(options, T.string.create('a'), false,
        `subject expects to be 'a' but is actually false`)
    })

    test('optional string violation', () => {
      assertReportEquals(options, T.string.optional, false,
        `subject expects to be (string | undefined) but is actually false`)
    })

    test('optional specific string violation', () => {
      assertReportEquals(options, T.string.optional.create('b'), false,
        `subject expects to be ('b' | undefined) but is actually false`)
    })

    test('string list violation', () => {
      assertReportEquals(options, T.string.list('a', 'b', 'c'), false,
        `subject expects to be ('a' | 'b' | 'c') but is actually false`)
    })

    test('optional string list violation', () => {
      assertReportEquals(options, T.string.optional.list('a', 'b', 'c'), false,
        `subject expects to be ('a' | 'b' | 'c' | undefined) but is actually false`)
    })
  })
  describe('array', () => {
    test('base violation', () => {
      assertReportEquals(options, T.array, undefined,
        `subject expects to be Array<any> but is actually undefined`)
    })
    test('specific array violation', () => {
      assertReportEquals(options, T.array.create(T.number), false,
        `subject expects to be Array<number> but is actually false`)
    })
    test('optional array violation', () => {
      assertReportEquals(options, T.array.optional, false,
        `subject expects to be (Array<any> | undefined) but is actually false`)
    })
    test('optional specific array violation', () => {
      assertReportEquals(options, T.array.optional.create(T.number), false,
        `subject expects to be (Array<number> | undefined) but is actually false`)
    })
  })
  describe('tuple', () => {
    test('specific tuple violation', () => {
      assertReportEquals(
        options,
        T.tuple.create(T.number.create(1), T.string.create('a')),
        false,
        `subject expects to be [1,'a'] but is actually false`)
    })
    test('optional specific tuple violation', () => {
      assertReportEquals(
        options,
        T.tuple.optional.create(T.number),
        false,
        `subject expects to be ([number] | undefined) but is actually false`)
    })
    test('missing entry', () => {
      assertReportEquals(
        options,
        T.tuple.create(T.null),
        [],
        [
          `subject expects to be [null] but is actually []`,
          `subject[0] expects to be null but is actually undefined`
        ].join('\n')
      )
    })
  })
  describe('object', () => {
    test('specific object violation', () => {
      assertReportEquals(
        options,
        T.object.create({ a: T.null }),
        false,
        `subject expects to be { a: null } but is actually false`)
    })
    test('optional specific object violation', () => {
      assertReportEquals(
        options,
        T.object.optional.create({ a: T.object.create({ b: T.string }) }),
        false,
        `subject expects to be ({ a: { b: string } } | undefined) but is actually false`)
    })
  })
  describe('record', () => {
    test('specific record violation', () => {
      assertReportEquals(
        options,
        T.record.create(T.null),
        false,
        `subject expects to be Record<string, null> but is actually false`)
    })
    test('optional specific record violation', () => {
      assertReportEquals(
        options,
        T.record.optional.create(T.record.create(T.string)),
        false,
        `subject expects to be (Record<string, Record<string, string>> | undefined) but is actually false`)
    })
    test(`nested violation`, () => {
      assertReportEquals(
        options,
        T.record.optional.create(T.record.create(T.string)),
        { a: { b: 1 } },
        `subject expects to be (Record<string, Record<string, string>> | undefined) but is actually { a: { b: 1 } }`)
    })
  })
})
describe.skip('strict()', () => {
  const options = { strict: false, debug: false }
  describe('tuple', () => {
    test('extra entry', () => {
      assertReportEquals(
        options,
        T.tuple.create(T.null),
        [null, 1],
        [
          `subject expects to be strictly [null] but is actually [null, 1]`,
          `index 1 should not contain any value`
        ].join('\n')
      )
    })
    test('extra entries', () => {
      assertReportEquals(
        options,
        T.tuple.create(T.null, T.number),
        [null, 1, 'a', false],
        [
          `subject expects to be strictly [null,number] but is actually [null, 1, 'a', false]`,
          `indices 2,3 should not contain any value`
        ].join('\n')
      )
    })
  })
  describe('object', () => {
    test('extra property', () => {
      assertReportEquals(
        options,
        T.object.create({ a: T.number }),
        { a: 1, b: 2 },
        [
          `subject expects to be strictly { a: number } but is actually { a: 1, b: 2 }`,
          `property b should not contain any value`
        ].join('\n')
      )
    })
    test('extra properties', () => {
      assertReportEquals(
        options,
        T.object.create({ a: T.number }),
        { a: 1, b: 2, c: 'c' },
        [
          `subject expects to be strictly { a: number } but is actually { a: 1, b: 2, c: 'c' }`,
          `properties b,c should not contain any value`
        ].join('\n')
      )
    })
  })
})

function assertReportEquals(options: analyze.Options, type: AllType, subject: unknown, report: string) {
  expect(getPlainAnalysisReport(analyze(options, type, subject))).toEqual(report)
}
