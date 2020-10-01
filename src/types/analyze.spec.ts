import { satisfies } from 'satisfier'
import * as T from '.'
import { analyze } from './analyze'

describe('non-strict', () => {
  const options = { strict: false }
  describe('undefined', () => {
    test('only undefined passes', () => {
      const t = T.undefined
      assert(analyze(options, t, undefined), { type: 'undefined' })
      analyzeFailsOtherThan(options, t, undefined)
      assert(analyze(options, t, true), { type: 'undefined', fail: true, actual: true })
    })
  })
  describe('null', () => {
    test('only null passes', () => {
      const t = T.null
      assert(analyze(options, t, null), { type: 'null' })
      analyzeFailsOtherThan(options, t, null)
      assert(analyze(options, t, true), { type: 'null', fail: true, actual: true })
    })
    test('optional', () => {
      const t = T.null.optional
      const pass = {
        type: 'union',
        value: [
          { type: 'null' },
          { type: 'undefined' }
        ]
      }
      assert(analyze(options, t, null), pass)
      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, true), {
        type: 'union',
        value: [
          { type: 'null' },
          { type: 'undefined' }
        ],
        fail: true,
        actual: true
      })
    })
  })
  describe('boolean', () => {
    test('only true | false passes', () => {
      const t = T.boolean
      const pass = { type: 'boolean' }
      assert(analyze(options, t, true), pass)
      assert(analyze(options, t, false), pass)
      analyzeFailsOtherThan(options, t, true, false)
      assert(analyze(options, t, null), { type: 'boolean', fail: true, actual: null })
    })
    test('true', () => {
      const t = T.boolean.true
      assert(analyze(options, t, true), { type: 'boolean', value: true })
      assert(analyze(options, t, null), { type: 'boolean', value: true, fail: true, actual: null })
    })
    test('false', () => {
      const t = T.boolean.false
      assert(analyze(options, t, false), { type: 'boolean', value: false })
      assert(analyze(options, t, null), { type: 'boolean', value: false, fail: true, actual: null })
    })
    test('optional', () => {
      const t = T.boolean.optional
      const pass = {
        type: 'union',
        value: [
          { type: 'boolean' },
          { type: 'undefined' }
        ],
      }
      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, true), pass)
      assert(analyze(options, t, false), pass)
      analyzeFailsOtherThan(options, t, true, false, undefined)
      assert(analyze(options, t, null), {
        type: 'union',
        value: [
          { type: 'boolean' },
          { type: 'undefined' }
        ],
        fail: true,
        actual: null
      })
    })
    test('optional create', () => {
      const t = T.boolean.optional.create(true)
      const pass = {
        type: 'union',
        value: [
          { type: 'boolean', value: true },
          { type: 'undefined' }
        ],
      }
      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, true), pass)
      assert(analyze(options, t, false), {
        type: 'union',
        value: [
          { type: 'boolean', value: true },
          { type: 'undefined' }
        ],
        fail: true,
        actual: false
      })
    })
    test('optional true', () => {
      const t = T.boolean.optional.true
      const pass = {
        type: 'union',
        value: [
          { type: 'boolean', value: true },
          { type: 'undefined' }
        ],
      }
      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, true), pass)
      assert(analyze(options, t, false), {
        type: 'union',
        value: [
          { type: 'boolean', value: true },
          { type: 'undefined' }
        ],
        fail: true,
        actual: false
      })
    })
    test('optional false', () => {
      const t = T.boolean.optional.false
      const pass = {
        type: 'union',
        value: [
          { type: 'boolean', value: false },
          { type: 'undefined' }
        ],
      }
      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, false), pass)
      assert(analyze(options, t, true), {
        type: 'union',
        value: [
          { type: 'boolean', value: false },
          { type: 'undefined' }
        ],
        fail: true,
        actual: true
      })
    })
  })
  describe('number', () => {
    test('only number passes', () => {
      const t = T.number
      const pass = { type: 'number' }
      assert(analyze(options, t, 0), pass)
      assert(analyze(options, t, 1), pass)
      assert(analyze(options, t, -1), pass)
      analyzeFailsOtherThan(options, t, -1, 0, 1)
      assert(analyze(options, t, null), { type: 'number', fail: true, actual: null })
    })
    test('0', () => {
      const t = T.number.create(0)
      const pass = { type: 'number', value: 0 }
      assert(analyze(options, t, 0), pass)
      analyzeFailsOtherThan(options, t, 0)
      assert(analyze(options, t, 1), { type: 'number', value: 0, fail: true, actual: 1 })
    })
    test('1', () => {
      const t = T.number.create(1)
      const pass = { type: 'number', value: 1 }
      assert(analyze(options, t, 1), pass)
      analyzeFailsOtherThan(options, t, 1)
      assert(analyze(options, t, 0), { type: 'number', value: 1, fail: true, actual: 0 })
    })
    test('optional', () => {
      const t = T.number.optional
      const pass = {
        type: 'union',
        value: [
          { type: 'number' },
          { type: 'undefined' }
        ]
      }
      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, 0), pass)
      assert(analyze(options, t, 1), pass)
      assert(analyze(options, t, -1), pass)
      analyzeFailsOtherThan(options, t, -1, 0, 1, undefined)
      assert(analyze(options, t, null), {
        type: 'union',
        value: [
          { type: 'number' },
          { type: 'undefined' }
        ],
        fail: true,
        actual: null
      })
    })
    test('optional create', () => {
      const t = T.number.optional.create(1)
      const pass = {
        type: 'union',
        value: [
          { type: 'number', value: 1 },
          { type: 'undefined' }
        ]
      }
      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, 1), pass)
      assert(analyze(options, t, 0), {
        type: 'union',
        value: [
          { type: 'number', value: 1 },
          { type: 'undefined' }
        ],
        fail: true,
        actual: 0
      })
    })
    test('list: single', () => {
      const t = T.number.list(1)
      const pass = { type: 'number', value: 1 }
      assert(analyze(options, t, 1), pass)
      assert(analyze(options, t, 0), {
        type: 'number',
        value: 1,
        fail: true,
        actual: 0
      })
    })
    test('list: multiple', () => {
      const t = T.number.list(1, 2, 3)
      const pass = {
        type: 'union',
        value: [
          { type: 'number', value: 1 },
          { type: 'number', value: 2 },
          { type: 'number', value: 3 },
        ]
      }
      assert(analyze(options, t, 1), pass)
      assert(analyze(options, t, 2), pass)
      assert(analyze(options, t, 3), pass)
      assert(analyze(options, t, 0), {
        type: 'union',
        value: [
          { type: 'number', value: 1 },
          { type: 'number', value: 2 },
          { type: 'number', value: 3 }
        ],
        fail: true,
        actual: 0
      })
    })
    test('optional.list: multiple', () => {
      const t = T.number.optional.list(1, 2, 3)
      const pass = {
        type: 'union',
        value: [
          { type: 'number', value: 1 },
          { type: 'number', value: 2 },
          { type: 'number', value: 3 },
          { type: 'undefined' }
        ]
      }
      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, 1), pass)
      assert(analyze(options, t, 2), pass)
      assert(analyze(options, t, 3), pass)
      assert(analyze(options, t, 0), {
        type: 'union',
        value: [
          { type: 'number', value: 1 },
          { type: 'number', value: 2 },
          { type: 'number', value: 3 },
          { type: 'undefined' }
        ],
        fail: true,
        actual: 0
      })
    })
  })
  describe('string', () => {
    test('only string passes', () => {
      const t = T.string
      const pass = { type: 'string' }
      assert(analyze(options, t, ''), pass)
      assert(analyze(options, t, 'a'), pass)
      analyzeFailsOtherThan(options, t, '', 'a')
      assert(analyze(options, t, null), { type: 'string', fail: true, actual: null })
    })
    test("''", () => {
      const t = T.string.create('')
      const pass = { type: 'string', value: '' }
      assert(analyze(options, t, ''), pass)
      analyzeFailsOtherThan(options, t, '')
      assert(analyze(options, t, 'a'), { type: 'string', value: '', fail: true, actual: 'a' })
    })
    test(`'a'`, () => {
      const t = T.string.create('a')
      const pass = { type: 'string', value: 'a' }
      assert(analyze(options, t, 'a'), pass)
      analyzeFailsOtherThan(options, t, 'a')
      assert(analyze(options, t, ''), { type: 'string', value: 'a', fail: true, actual: '' })
    })
    test('optional', () => {
      const t = T.string.optional
      const pass = {
        type: 'union',
        value: [
          { type: 'string' },
          { type: 'undefined' }
        ]
      }
      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, ''), pass)
      assert(analyze(options, t, 'a'), pass)
      analyzeFailsOtherThan(options, t, '', 'a', undefined)
      assert(analyze(options, t, null), {
        type: 'union',
        value: [
          { type: 'string' },
          { type: 'undefined' }
        ],
        fail: true,
        actual: null
      })
    })
    test('optional create', () => {
      const t = T.string.optional.create('a')
      const pass = {
        type: 'union',
        value: [
          { type: 'string', value: 'a' },
          { type: 'undefined' }
        ]
      }
      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, 'a'), pass)
      assert(analyze(options, t, ''), {
        type: 'union',
        value: [
          { type: 'string', value: 'a' },
          { type: 'undefined' }
        ],
        fail: true,
        actual: ''
      })
    })
    test('list: single', () => {
      const t = T.string.list('a')
      assert(analyze(options, t, 'a'), { type: 'string', value: 'a' })
      assert(analyze(options, t, ''), {
        type: 'string',
        value: 'a',
        fail: true,
        actual: ''
      })
    })
    test('list: multiple', () => {
      const t = T.string.list('1', '2', '3')
      const pass = {
        type: 'union',
        value: [
          { type: 'string', value: '1' },
          { type: 'string', value: '2' },
          { type: 'string', value: '3' }
        ]
      }
      assert(analyze(options, t, '1'), pass)
      assert(analyze(options, t, '2'), pass)
      assert(analyze(options, t, '3'), pass)
      assert(analyze(options, t, 1), {
        type: 'union',
        value: [
          { type: 'string', value: '1' },
          { type: 'string', value: '2' },
          { type: 'string', value: '3' },
        ],
        fail: true,
        actual: 1
      })
    })
    test('optional.list: multiple', () => {
      const t = T.string.optional.list('1', '2', '3')
      const pass = {
        type: 'union',
        value: [
          { type: 'string', value: '1' },
          { type: 'string', value: '2' },
          { type: 'string', value: '3' },
          { type: 'undefined' }
        ]
      }
      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, '1'), pass)
      assert(analyze(options, t, '2'), pass)
      assert(analyze(options, t, '3'), pass)
      assert(analyze(options, t, 1), {
        type: 'union',
        value: [
          { type: 'string', value: '1' },
          { type: 'string', value: '2' },
          { type: 'string', value: '3' },
          { type: 'undefined' }
        ],
        fail: true,
        actual: 1
      })
    })
  })
  describe('bigint', () => {
    // test('only number passes', () => {
    //   const t = T.number
    //   const pass = { type: 'number' }
    //   assert(analyze(options, t, 0), pass)
    //   assert(analyze(options, t, 1), pass)
    //   assert(analyze(options, t, -1), pass)
    //   analyzeFailsOtherThan(options, t, -1, 0, 1)
    //   assert(analyze(options, t, null), { pass: false, type: 'number', actual: null })
    // })
    // test('0', () => {
    //   const t = T.number.create(0)
    //   const pass = { type: 'number', value: 0 }
    //   assert(analyze(options, t, 0), pass)
    //   analyzeFailsOtherThan(options, t, 0)
    //   assert(analyze(options, t, 1), { pass: false, type: 'number', value: 0, actual: 1 })
    // })
    // test('1', () => {
    //   const t = T.number.create(1)
    //   const pass = { type: 'number', value: 1 }
    //   assert(analyze(options, t, 1), pass)
    //   analyzeFailsOtherThan(options, t, 1)
    //   assert(analyze(options, t, 0), { pass: false, type: 'number', value: 1, actual: 0 })
    // })
    // test('optional', () => {
    //   const t = T.number.optional
    //   const pass = {
    //     pass: true,
    //     type: 'union',
    //     value: [
    //       { type: 'number' },
    //       { type: 'undefined' }
    //     ]
    //   }
    //   assert(analyze(options, t, undefined), pass)
    //   assert(analyze(options, t, 0), pass)
    //   assert(analyze(options, t, 1), pass)
    //   assert(analyze(options, t, -1), pass)
    //   analyzeFailsOtherThan(options, t, -1, 0, 1, undefined)
    //   assert(analyze(options, t, null), {
    //     pass: false,
    //     type: 'union',
    //     value: [
    //       { pass: false, type: 'number', actual: null },
    //       { pass: false, type: 'undefined', actual: null }
    //     ],
    //     actual: null
    //   })
    // })
    // test('optional create', () => {
    //   const t = T.number.optional.create(1)
    //   const pass = {
    //     pass: true,
    //     type: 'union',
    //     value: [
    //       { type: 'number', value: 1 },
    //       { type: 'undefined' }
    //     ]
    //   }
    //   assert(analyze(options, t, undefined), pass)
    //   assert(analyze(options, t, 1), pass)
    //   assert(analyze(options, t, 0), {
    //     pass: false,
    //     type: 'union',
    //     value: [
    //       { pass: false, type: 'number', value: 1, actual: 0 },
    //       { pass: false, type: 'undefined', actual: 0 }
    //     ],
    //     actual: 0
    //   })
    // })
    // test('list: single', () => {
    //   const t = T.number.list(1)
    //   const pass = { type: 'number', value: 1 }
    //   assert(analyze(options, t, 1), pass)
    //   assert(analyze(options, t, 0), {
    //     pass: false,
    //     type: 'number',
    //     value: 1,
    //     actual: 0
    //   })
    // })
    // test('list: multiple', () => {
    //   const t = T.number.list(1, 2, 3)
    //   const pass = {
    //     pass: true,
    //     type: 'union',
    //     value: [
    //       { type: 'number', value: 1 },
    //       { type: 'number', value: 2 },
    //       { type: 'number', value: 3 },
    //     ]
    //   }
    //   assert(analyze(options, t, 1), pass)
    //   assert(analyze(options, t, 2), pass)
    //   assert(analyze(options, t, 3), pass)
    //   assert(analyze(options, t, 0), {
    //     pass: false,
    //     type: 'union',
    //     value: [
    //       { pass: false, type: 'number', value: 1, actual: 0 },
    //       { pass: false, type: 'number', value: 2, actual: 0 },
    //       { pass: false, type: 'number', value: 3, actual: 0 }
    //     ],
    //     actual: 0
    //   })
    // })
    // test('optional.list: multiple', () => {
    //   const t = T.number.optional.list(1, 2, 3)
    //   const pass = {
    //     pass: true,
    //     type: 'union',
    //     value: [
    //       { type: 'number', value: 1 },
    //       { type: 'number', value: 2 },
    //       { type: 'number', value: 3 },
    //       { type: 'undefined' }
    //     ]
    //   }
    //   assert(analyze(options, t, undefined), pass)
    //   assert(analyze(options, t, 1), pass)
    //   assert(analyze(options, t, 2), pass)
    //   assert(analyze(options, t, 3), pass)
    //   assert(analyze(options, t, 0), {
    //     pass: false,
    //     type: 'union',
    //     value: [
    //       { pass: false, type: 'number', value: 1, actual: 0 },
    //       { pass: false, type: 'number', value: 2, actual: 0 },
    //       { pass: false, type: 'number', value: 3, actual: 0 },
    //       { pass: false, type: 'undefined', actual: 0 }
    //     ],
    //     actual: 0
    //   })
    // })
  })
  describe('symbol', () => {
    test('only symbol passes', () => {
      const t = T.symbol
      const pass = { type: 'symbol' }
      assert(analyze(options, t, Symbol()), pass)
      assert(analyze(options, t, Symbol('abc')), pass)
      assert(analyze(options, t, Symbol.for('def')), pass)
      analyzeFailsOtherThan(options, t, Symbol.for('a'))
      assert(analyze(options, t, true), { type: 'symbol', fail: true, actual: true })
    })
    test('optional', () => {
      const t = T.symbol.optional
      const pass = {
        type: 'union',
        value: [
          { type: 'symbol' },
          { type: 'undefined' }
        ]
      }
      assert(analyze(options, t, Symbol()), pass)
      assert(analyze(options, t, Symbol('abc')), pass)
      assert(analyze(options, t, Symbol.for('def')), pass)
      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, true), {
        type: 'union',
        value: [
          { type: 'symbol' },
          { type: 'undefined' }
        ],
        fail: true,
        actual: true
      })
    })
  })
  describe('union', () => {
    test('on two types', () => {
      const t = T.union.create(T.boolean, T.number)
      const pass = { type: 'union', value: [{ type: 'boolean' }, { type: 'number' }] }
      assert(analyze(options, t, 0), pass)
      assert(analyze(options, t, false), pass)
    })
    test('on multiple primitive types', () => {
      const t = T.union.create(T.boolean, T.null, T.number)
      const pass = {
        type: 'union',
        value: [
          { type: 'boolean' },
          { type: 'null' },
          { type: 'number' }
        ]
      }
      assert(analyze(options, t, false), pass)
      assert(analyze(options, t, null), pass)
      assert(analyze(options, t, 0), pass)
    })
  })
  describe('array', () => {
    test('only array of any kind passes', () => {
      const t = T.array
      const pass = { type: 'array' }
      assert(analyze(options, t, []), pass)
      assert(analyze(options, t, ['a']), pass)
      analyzeFailsOtherThan(options, t, [], ['a'])
      assert(analyze(options, t, null), { type: 'array', fail: true, actual: null })
    })
    test('array.unknown accepts only array of any kind', () => {
      const t = T.array.unknown
      const pass = { type: 'array', value: { type: 'unknown' } }
      assert(analyze(options, t, []), pass)
      assert(analyze(options, t, ['a']), pass)
      analyzeFailsOtherThan(options, t, [], ['a'])
      assert(analyze(options, t, null), {
        type: 'array',
        value: { type: 'unknown' },
        fail: true,
        actual: null
      })
    })
    test('specific type', () => {
      const t = T.array.create(T.number)
      const pass = { type: 'array', value: { type: 'number' } }
      assert(analyze(options, t, []), pass)
      assert(analyze(options, t, [0]), pass)
      assert(analyze(options, t, [1, 2]), pass)
      assert(analyze(options, t, ['a']), {
        type: 'array',
        value: { type: 'number', fail: true, keys: [0], actual: ['a'] },
        fail: true,
        actual: ['a']
      })
      assert(analyze(options, t, [1, 'a']), {
        type: 'array',
        // value: { type: 'number' },
        value: { type: 'number', fail: true, keys: [1], actual: ['a'] },
        fail: true,
        actual: [1, 'a']
      })
      assert(analyze(options, t, ['a', 1]), {
        type: 'array',
        value: { type: 'number', fail: true, keys: [0], actual: ['a'] },
        fail: true,
        actual: ['a', 1]
      })
    })
    test('specific const type', () => {
      const t = T.array.create(T.number.create(2))
      const pass = { type: 'array', value: { type: 'number', value: 2 } }
      assert(analyze(options, t, []), pass)
      assert(analyze(options, t, [2]), pass)
      assert(analyze(options, t, [0]), {
        type: 'array',
        value: { type: 'number', value: 2, fail: true, keys: [0], actual: [0] },
        fail: true,
        actual: [0]
      })
    })
    test(`array's value type can be union type`, () => {
      const t = T.array.create(T.union.create(T.number, T.boolean))
      const pass = {
        type: 'array',
        value: {
          type: 'union',
          value: [{ type: 'number' }, { type: 'boolean' }]
        }
      }
      assert(analyze(options, t, []), pass)
      assert(analyze(options, t, [0]), pass)
      assert(analyze(options, t, [false]), pass)
      assert(analyze(options, t, [false, 0]), pass)
      assert(analyze(options, t, [0, false, '']), {
        type: 'array',
        value: {
          type: 'union',
          value: [{ type: 'number' }, { type: 'boolean' }],
          fail: true,
          keys: [2],
          actual: ['']
        },
        fail: true,
        actual: [0, false, '']
      })
    })
    test('optional', () => {
      const t = T.array.optional
      const pass = { type: 'union', value: [{ type: 'array' }, { type: 'undefined' }] }
      assert(analyze(options, t, []), pass)
      assert(analyze(options, t, [1]), pass)
      assert(analyze(options, t, ['a']), pass)
      assert(analyze(options, t, undefined), pass)
    })
    test('optional create', () => {
      const t = T.array.optional.create(T.string)
      const pass = {
        type: 'union',
        value: [
          { type: 'array', value: { type: 'string' } },
          { type: 'undefined' }
        ]
      }
      assert(analyze(options, t, ['']), pass)
      assert(analyze(options, t, ['a']), pass)
      assert(analyze(options, t, undefined), pass)
    })
  })
  describe('tuple', () => {
    test('single value', () => {
      const t = T.tuple.create(T.number)
      const pass = { type: 'tuple', value: [{ type: 'number' }] }
      assert(analyze(options, t, [0]), pass)
      assert(analyze(options, t, [1]), pass)
      assert(analyze(options, t, true), {
        type: 'tuple',
        value: [{ type: 'number' }],
        fail: true,
        actual: true
      })
      assert(analyze(options, t, []), {
        type: 'tuple',
        value: [{ type: 'number', fail: true, actual: undefined }],
        fail: true,
        actual: []
      })
      assert(analyze(options, t, ['a']), {
        type: 'tuple',
        value: [{ type: 'number', fail: true, actual: 'a' }],
        fail: true,
        actual: ['a']
      })
    })
    test('two values', () => {
      const t = T.tuple.create(T.number, T.string)
      const pass = { type: 'tuple', value: [{ type: 'number' }, { type: 'string' }] }

      expect(T.satisfy(t, [0, ''])).toBe(true)
      expect(T.satisfy(t, [0])).toBe(false)

      assert(analyze(options, t, [0, '']), pass)
      assert(analyze(options, t, [1]), {
        type: 'tuple',
        value: [
          { type: 'number' },
          { type: 'string', fail: true, actual: undefined }
        ],
        fail: true,
        actual: [1]
      })
      assert(analyze(options, t, [1, 2]), {
        type: 'tuple',
        value: [
          { type: 'number' },
          { type: 'string', fail: true, actual: 2 }
        ],
        fail: true,
        actual: [1, 2]
      })
      assert(analyze(options, t, ['a']), {
        type: 'tuple',
        value: [
          { type: 'number', fail: true, actual: 'a' },
          { type: 'string', fail: true, actual: undefined }
        ],
        fail: true,
        actual: ['a']
      })
    })
  })
  describe('object', () => {
    test('only object of any kind passes', () => {
      const t = T.object
      const pass = { type: 'object' }
      assert(analyze(options, t, {}), pass)
      assert(analyze(options, t, { a: 1 }), pass)
      assert(analyze(options, t, { 0: 0 }), pass)
      assert(analyze(options, t, []), {
        type: 'object',
        fail: true,
        actual: []
      })
      assert(analyze(options, t, null), {
        type: 'object',
        fail: true,
        actual: null
      })
      analyzeFailsOtherThan(options, t, {}, { a: 1 })
    })
    test('single prop', () => {
      const t = T.object.create({ a: T.number })
      const pass = { type: 'object', value: { a: { type: 'number' } } }
      assert(analyze(options, t, { a: 0 }), pass)
      assert(analyze(options, t, { a: 1 }), pass)
      assert(analyze(options, t, { a: 'a' }), {
        type: 'object',
        value: { a: { type: 'number', fail: true, actual: 'a' } },
        fail: true,
        actual: { a: 'a' }
      })
      assert(analyze(options, t, { a: { b: 'b' } }), {
        type: 'object',
        value: { a: { type: 'number', fail: true, actual: { b: 'b' } } },
        fail: true,
        actual: { a: { b: 'b' } }
      })
    })
    test('two props', () => {
      const t = T.object.create({ a: T.number.create(1), b: T.string })
      const pass = {
        type: 'object',
        value: { a: { type: 'number', value: 1 }, b: { type: 'string' } }
      }
      assert(analyze(options, t, { a: 1, b: '' }), pass)
      assert(analyze(options, t, { a: 1, b: 'b' }), pass)
      assert(analyze(options, t, { a: 1, b: '' }), pass)
      assert(analyze(options, t, { a: 1, b: '', c: 3 }), pass)
      assert(analyze(options, t, { a: 2, b: '' }), {
        type: 'object',
        value: {
          a: { type: 'number', value: 1, fail: true, actual: 2 },
          b: { type: 'string' }
        },
        fail: true,
        actual: { a: 2, b: '' }
      })
    })
    test('props with union', () => {
      const t = T.object.create({
        a: T.union.create(T.number.create(1), T.boolean.true),
        b: T.string
      })
      const pass = {
        type: 'object',
        value: {
          a: {
            type: 'union',
            value: [{ type: 'number', value: 1 }, { type: 'boolean', value: true }]
          },
          b: { type: 'string' }
        }
      }

      assert(analyze(options, t, { a: 1, b: '' }), pass)
      assert(analyze(options, t, { a: true, b: '' }), pass)
      assert(analyze(options, t, { a: false, b: '' }), {
        type: 'object',
        value: {
          a: {
            type: 'union',
            value: [
              { type: 'number', value: 1 },
              { type: 'boolean', value: true }
            ],
            fail: true,
            actual: false
          },
          b: { type: 'string' }
        },
        fail: true,
        actual: { a: false, b: '' }
      })
    })
    test('nested object', () => {
      const t = T.object.create({ a: T.object.create({ b: T.number }) })
      const pass = {
        type: 'object',
        value: {
          a: { type: 'object', value: { b: { type: 'number' } } }
        }
      }
      assert(analyze(options, t, { a: { b: 0 } }), pass)
      assert(analyze(options, t, { a: { b: 'b' } }), {
        type: 'object',
        value: {
          a: {
            type: 'object',
            value: { b: { type: 'number', fail: true, actual: 'b' } },
            fail: true,
            actual: { b: 'b' }
          }
        },
        fail: true,
        actual: { a: { b: 'b' } }
      })
    })
    test('optional', () => {
      const t = T.object.optional
      const pass = { type: 'union', value: [{ type: 'object' }, { type: 'undefined' }] }

      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, {}), pass)
      assert(analyze(options, t, { a: 0 }), pass)
    })
    test('optional create', () => {
      const t = T.object.optional.create({ a: T.string })
      const pass = {
        type: 'union',
        value: [
          { type: 'object', value: { a: { type: 'string' } } },
          { type: 'undefined' }
        ]
      }

      assert(analyze(options, t, undefined), pass)
      assert(analyze(options, t, { a: '' }), pass)
      assert(analyze(options, t, {}), {
        type: 'union',
        value: [
          { type: 'object', value: { a: { type: 'string' } } },
          { type: 'undefined' }
        ],
        fail: true,
        actual: {}
      })
    })
  })
  describe('record', () => {
    test('base type', () => {
      const t = T.record.create(T.number)
      const pass = { type: 'record', value: { type: 'number' } }

      analyzeFailsOtherThan(options, T.record.create(T.null), {}, { a: 1 })
      assert(analyze(options, t, { a: 1 }), pass)
      assert(analyze(options, t, { a: 'b' }), {
        type: 'record',
        value: { type: 'number', fail: true, keys: ['a'], actual: ['b'] },
        fail: true,
        actual: { a: 'b' }
      })
    })
  })
})

describe('strict', () => {
  const options = { strict: true }
  describe('tuple', () => {
    test('have more elements then specified will fail', () => {
      const t = T.tuple.create(T.number)
      assert(analyze(options, t, [1, 2, 3, 4]), {
        type: 'tuple',
        value: [
          { type: 'number' },
          { type: 'never', fail: true, keys: [1, 2, 3], actual: [2, 3, 4] }
        ],
        fail: true,
        actual: [1, 2, 3, 4]
      })
    })
  })
  describe('object', () => {
    test('have extra properties then specified will fail', () => {
      const t = T.object.create({ a: T.number })
      assert(analyze(options, t, { a: 1, b: 2, c: 'c' }), {
        type: 'object',
        value: {
          a: { type: 'number' },
          b: { type: 'never', fail: true, actual: 2 },
          c: { type: 'never', fail: true, actual: 'c' }
        },
        fail: true,
        actual: { a: 1, b: 2, c: 'c' }
      })
    })
  })
})

function assert(result: analyze.Analysis, analysis: analyze.Analysis) {
  expect(result).toEqual(analysis)
}

function analyzeFailsOtherThan(options: analyze.Options, type: T.AllType, ...excepts: any[]) {
  const values = [undefined, null, true, false, -1, 0, 1, -1n, 0n, 1n, '', 'a', [], ['a'], {}, { a: 1 }, Symbol.for('a')]
  values.forEach(v => {
    if (!excepts.some(e => satisfies(v, e))) {
      expect(analyze(options, type, v).fail).toBe(true)
    }
  })
}
