import { isType, Types } from './typeCheckers'

describe('isType()', () => {
  test('undefined', () => {
    expect(isType(Types.Undefined, undefined)).toBe(true)
    expect(isType(Types.Undefined, null)).toBe(false)
  })
});
