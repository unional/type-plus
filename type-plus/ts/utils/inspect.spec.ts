/* eslint-disable no-console */
import { expect, it, jest } from '@jest/globals'
import { inspect } from '../index.js'

	it('should return the same value', () => {
		const value = { a: 1, b: 2 }
		expect(inspect(value, () => {})).toBe(value)
	})
	it('should call the inspector', () => {
		const value = { a: 1, b: 2 }
		const spy = jest.fn()
		inspect(value, spy)
		expect(spy).toBeCalledWith(value)
	})
	it('defaults to console.dir', () => {
		const value = { a: 1, b: 2 }
		const dir = console.dir
		console.dir = jest.fn()
		inspect(value)
		expect(console.dir).toBeCalledWith(value)
		console.dir = dir
	})
