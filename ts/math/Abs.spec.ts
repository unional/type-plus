import { Abs, testType } from '../index.js'

test('positive returns itself', () => {
	testType.equal<Abs<1>, 1>(true)
})

test('negative returns positive', () => {
	testType.equal<Abs<-1234>, 1234>(true)
})

test('number returns Fail', () => {
	testType.equal<Abs<number>, never>(true)
	testType.equal<Abs<number, 0>, 0>(true)
})
