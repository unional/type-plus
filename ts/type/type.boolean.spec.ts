import { type } from '../index.js'

it('accepts boolean', () => {
	type.boolean<boolean>(true)
})

it('rejects boolean literal', () => {
	type.boolean<true>(false)
	type.boolean<false>(false)
})
