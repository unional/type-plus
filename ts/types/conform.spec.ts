import * as T from './index.js'
import { conform } from './conform.js'

test('conform is strict', () => {
	const t = T.tuple.create(T.string)
	expect(conform(t, ['a', 'b', 'c', 'd'])).toBe(false)
})
