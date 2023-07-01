import { describe, it, test } from '@jest/globals'
import { assertType, isType, type AwaitedProp, type PromiseValue } from '../index.js'

test('extract value from Promise', () => {
	const y: PromiseValue<Promise<string>> = ''
	assertType.isString(y)
})

describe('AwaitedProp<T, V>', () => {
	it('awaits one of the props', () => {
		type E = { a: number, p: Promise<number> }
		type R = AwaitedProp<E, 'p'>
		isType.equal<true, { a: number, p: number }, R>()
	})

	it('awaits multiple props', () => {
		type E = {
			a: number,
			p1: Promise<number>,
			p2: Promise<number>,
			p3: Promise<number>
		}
		type R = AwaitedProp<E, 'p1' | 'p2'>
		isType.equal<
			true,
			{
				a: number,
				p1: number,
				p2: number,
				p3: Promise<number>
			},
			R
		>()
	})
})
