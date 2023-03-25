/* eslint-disable @typescript-eslint/ban-types */
import { IsEmptyObject, type } from '../index.js'

test('true for {}', () => {
	type.true<IsEmptyObject<{}>>(true)
})
test('false for everything else', () => {
	type.false<IsEmptyObject<undefined>>(true)
	type.false<IsEmptyObject<false>>(true)
	type.false<IsEmptyObject<0>>(true)
	type.false<IsEmptyObject<''>>(true)
	type.false<IsEmptyObject<{ a: 1 }>>(true)
})
