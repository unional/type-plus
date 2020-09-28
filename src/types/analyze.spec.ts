import a from 'assertron'
import { analyze } from './analyze'
import * as T from '.'
import { satisfies } from 'satisfier'

describe('non-strict', () => {
  const options = { strict: false }
  describe('undefined', () => {
    test('only undefined passes', () => {
      const t = T.undefined
      isPass(analyze(options, t, undefined))
      analyzeFailsOtherThan(options, t, undefined)
      isFail(analyze(options, t, true), { type: 'undefined', pass: false, actual: true })
    })
  })
  describe('null', () => {
    test('only null passes', () => {
      const t = T.null
      isPass(analyze(options, t, null))
      analyzeFailsOtherThan(options, t, null)
      isFail(analyze(options, t, true), { type: 'null', pass: false, actual: true })
    })
    test('optional', () => {
      const t = T.null.optional
      isPass(analyze(options, t, null))
      isPass(analyze(options, t, undefined))
      isFail(analyze(options, t, true), {
        type: 'union',
        pass: false,
        value: [{
          type: 'null',
          pass: false,
          actual: true
        }, {
          type: 'undefined',
          pass: false,
          actual: true
        }],
        actual: true
      })
    })
  })

  describe('boolean', () => {
    test('only true | false passes', () => {
      const t = T.boolean
      isPass(analyze(options, t, true))
      isPass(analyze(options, t, false))
      analyzeFailsOtherThan(options, t, true, false)
      isFail(analyze(options, t, null), { type: 'boolean', pass: false, actual: null })
    })
    test('true', () => {
      const t = T.boolean.true
      isPass(analyze(options, t, true))
      isFail(analyze(options, t, null), { type: 'boolean', value: true, pass: false, actual: null })
    })
    test('false', () => {
      const t = T.boolean.false
      isPass(analyze(options, t, false))
      isFail(analyze(options, t, null), { type: 'boolean', value: false, pass: false, actual: null })
    })
    test('optional', () => {
      const t = T.boolean.optional
      isPass(analyze(options, t, undefined))
      isPass(analyze(options, t, true))
      isPass(analyze(options, t, false))
      analyzeFailsOtherThan(options, t, true, false, undefined)
      isFail(analyze(options, t, null), {
        type: 'union',
        value: [{
          type: 'boolean',
          pass: false,
          actual: null
        }, {
          type: 'undefined',
          pass: false,
          actual: null
        }],
        pass: false,
        actual: null
      })
    })
    test('optional create', () => {
      const t = T.boolean.optional.create(true)
      isPass(analyze(options, t, undefined))
      isPass(analyze(options, t, true))
      isFail(analyze(options, t, false), {
        type: 'union',
        value: [{
          type: 'boolean',
          value: true,
          pass: false,
          actual: false
        }, {
          type: 'undefined',
          pass: false,
          actual: false
        }],
        pass: false,
        actual: false
      })
    })
    test('optional true', () => {
      const t = T.boolean.optional.true
      isPass(analyze(options, t, undefined))
      isPass(analyze(options, t, true))
      isFail(analyze(options, t, false), {
        type: 'union',
        value: [{
          type: 'boolean',
          value: true,
          pass: false,
          actual: false
        }, {
          type: 'undefined',
          pass: false,
          actual: false
        }],
        pass: false,
        actual: false
      })
    })
    test('optional false', () => {
      const t = T.boolean.optional.false
      isPass(analyze(options, t, undefined))
      isPass(analyze(options, t, false))
      isFail(analyze(options, t, true), {
        type: 'union',
        value: [{
          type: 'boolean',
          value: false,
          pass: false,
          actual: true
        }, {
          type: 'undefined',
          pass: false,
          actual: true
        }],
        pass: false,
        actual: true
      })
    })
  })

  describe('number', () => {
    test('only number passes', () => {
      const t = T.number
      isPass(analyze(options, t, 0))
      isPass(analyze(options, t, 1))
      isPass(analyze(options, t, -1))
      analyzeFailsOtherThan(options, t, -1, 0, 1)
      isFail(analyze(options, t, null), { type: 'number', pass: false, actual: null })
    })

    test('0', () => {
      const t = T.number.create(0)
      isPass(analyze(options, t, 0))
      analyzeFailsOtherThan(options, t, 0)
      isFail(analyze(options, t, 1), { type: 'number', value: 0, pass: false, actual: 1 })
    })
    test('1', () => {
      const t = T.number.create(1)
      isPass(analyze(options, t, 1))
      analyzeFailsOtherThan(options, t, 1)
      isFail(analyze(options, t, 0), { type: 'number', value: 1, pass: false, actual: 0 })
    })
    test('optional', () => {
      const t = T.number.optional
      isPass(analyze(options, t, undefined))
      isPass(analyze(options, t, 0))
      isPass(analyze(options, t, 1))
      isPass(analyze(options, t, -1))
      analyzeFailsOtherThan(options, t, -1, 0, 1, undefined)
      isFail(analyze(options, t, null), {
        type: 'union',
        value: [{
          type: 'number',
          pass: false,
          actual: null
        }, {
          type: 'undefined',
          pass: false,
          actual: null
        }],
        pass: false,
        actual: null
      })
    })
    test('optional create', () => {
      const t = T.number.optional.create(1)
      isPass(analyze(options, t, undefined))
      isPass(analyze(options, t, 1))
      isFail(analyze(options, t, 0), {
        type: 'union',
        value: [{
          type: 'number',
          value: 1,
          pass: false,
          actual: 0
        }, {
          type: 'undefined',
          pass: false,
          actual: 0
        }],
        pass: false,
        actual: 0
      })
    })

    test('list: single', () => {
      const t = T.number.list(1)
      isPass(analyze(options, t, 1))
      isFail(analyze(options, t, 0), {
        type: 'number',
        value: 1,
        pass: false,
        actual: 0
      })
    })
    test('list: multiple', () => {
      const t = T.number.list(1, 2, 3)
      isPass(analyze(options, t, 1))
      isPass(analyze(options, t, 2))
      isPass(analyze(options, t, 3))
      isFail(analyze(options, t, 0), {
        type: 'union',
        value: [{
          type: 'number',
          value: 1,
          pass: false,
          actual: 0
        }, {
          type: 'number',
          value: 2,
          pass: false,
          actual: 0
        }, {
          type: 'number',
          value: 3,
          pass: false,
          actual: 0
        }],
        pass: false,
        actual: 0
      })
    })

    test('optional.list: multiple', () => {
      const t = T.number.optional.list(1, 2, 3)
      isPass(analyze(options, t, undefined))
      isPass(analyze(options, t, 1))
      isPass(analyze(options, t, 2))
      isPass(analyze(options, t, 3))
      isFail(analyze(options, t, 0), {
        type: 'union',
        value: [{
          type: 'number',
          value: 1,
          pass: false,
          actual: 0
        }, {
          type: 'number',
          value: 2,
          pass: false,
          actual: 0
        }, {
          type: 'number',
          value: 3,
          pass: false,
          actual: 0
        }, {
          type: 'undefined',
          pass: false,
          actual: 0
        }],
        pass: false,
        actual: 0
      })
    })
  })
})

describe('strict', () => {
  // test('good subject returns pass === true', () => {
  //   a.satisfies(analyze({ strict: true }, T.number, 1), { pass: true })
  // })
})

// const testValues = [
//   [undefined, (actual: any) => ({ type: 'undefined', pass: false, actual })],
//   [null, (actual: any) => ({ type: 'null', pass: false, actual }),
//     [true, (actual: ), false, 0, 1, 0n, 1n, '', 'a', [], ['a'], {}, { a: 1 }, Symbol(), Symbol.for('a')]

function isPass(result: analyze.Result) {
  a.satisfies(result, { pass: true })
}

function isFail(result: analyze.Result, analysis: analyze.Analysis) {
  expect(result).toEqual({ pass: false, analysis })
}

function analyzeFailsOtherThan(options: analyze.Options, type: T.AllType, ...excepts: any[]) {
  const values = [undefined, null, true, false, 0, 1, 0n, 1n, '', 'a', [], ['a'], {}, { a: 1 }, Symbol(), Symbol.for('a')]
  values.forEach(v => {
    if (!excepts.some(e => satisfies(v, e))) {
      a.satisfies(analyze(options, type, v), { pass: false })
    }
  })
}
