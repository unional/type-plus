import { Abs, type } from '../index.js'

test('positive returns itself', () => {
	type.equal<Abs<1>, 1>(true)
})

test('negative returns positive', () => {
	type.equal<Abs<-1234>, 1234>(true)
})

test('number returns Fail', () => {
	type.equal<Abs<number>, never>(true)
	type.equal<Abs<number, 0>, 0>(true)
})
