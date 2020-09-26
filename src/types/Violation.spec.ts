import { getPlainViolationsReport } from './Violation'

test.each([
  'bigint',
  'boolean',
  'null',
  'number',
  'record',
  'string',
  'symbol',
  'tuple'
])('a %s violation', (type) => {
  expect(getPlainViolationsReport([{
    path: [],
    expected: { type },
    actual: false
  }])).toEqual(`subject expects to be a ${type} but is actually 'false'`)
})

test.each([
  'array',
  'object',
  'union',
])('an %s violation', (type) => {
  expect(getPlainViolationsReport([{
    path: [],
    expected: { type },
    actual: false
  }])).toEqual(`subject expects to be an ${type} but is actually 'false'`)
})

test('undefined violation (when explicitly require to be undefined)', () => {
  expect(getPlainViolationsReport([{
    path: [],
    expected: { type: 'undefined' },
    actual: false
  }])).toEqual(`subject expects to be undefined but is actually 'false'`)
})

// test('never violation (occurs in `check()`)', () => {
//   expect(getPlainViolationsReport([{
//     path: [],
//     expected: { type: 'never' },
//     actual: false
//   }])).toEqual(`subject expects to be never but is actually 'false'`)
// })
