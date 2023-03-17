import { isType } from './isType.js'

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
