/* eslint-disable no-console */
import { expect, it, vi } from 'vitest'

import { inspect } from '../index.js'

it('should return the same value', () => {
	const value = { a: 1, b: 2 }
	expect(inspect(value, () => {})).toBe(value)
})
it('should call the inspector', () => {
	const value = { a: 1, b: 2 }
	const spy = vi.fn()
	inspect(value, spy)
	expect(spy).toBeCalledWith(value)
})
it('defaults to console.dir', () => {
	const value = { a: 1, b: 2 }
	const dir = console.dir
	console.dir = vi.fn()
	inspect(value)
	expect(console.dir).toBeCalledWith(value)
	console.dir = dir
})
