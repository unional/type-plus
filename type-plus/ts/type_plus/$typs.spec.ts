import { it } from '@jest/globals'

import { type $Type,testType } from '../index.js'

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

it('declares message before value to make it easier to read when hovered', () => {
	// hover over `R` to see how it is shown
	type R = $Type<'type', 'some message', { a: { b: { c: { d: { e: { f: { g: number } } } } } } }>
	testType.never<R>(false)
})
