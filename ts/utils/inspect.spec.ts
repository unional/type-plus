import { jest } from '@jest/globals'
import { inspect } from './index.js'

describe(`${inspect.name}()`, () => {
  it('should return the same value', () => {
    const value = { a: 1, b: 2 }
    expect(inspect(value, () => { })).toBe(value)
  })
  it('should call the inspector', () => {
    const value = { a: 1, b: 2 }
    const spy = jest.fn()
    inspect(value, spy)
    expect(spy).toBeCalledWith(value)
  })
})
