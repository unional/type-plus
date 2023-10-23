import { it } from '@jest/globals'

import { isType } from '../index.js'

it('can be used for type-only', () => {
	isType.never<never>()

	// @ts-expect-error
	isType.never<number>()
})

it('can be used for value', () => {
	isType.never({} as never)

	// @ts-expect-error
	isType.never(undefined)
})
