import { it } from '@jest/globals'
import type { $Type } from './type.js'

it('is unique for each value', () => {
	type X = $Type<'a', 'b'>
	type Y = $Type<'a', 'c'>
	// @ts-ignore
	let x: X = {} as any
	const y: Y = {} as any

	// Y is not assignable to X
	// @ts-expect-error
	x = y
})
