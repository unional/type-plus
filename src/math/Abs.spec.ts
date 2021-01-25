import { Abs, isType } from '..'

test('positive returns itself', () => {
  isType.equal<true, 1, Abs<1>>()
})

test('negative returns positive', () => {
  isType.equal<true, 12345, Abs<-12345>>()
})

test('number returns Fail', () => {
  isType.equal<true, never, Abs<number>>()
  isType.equal<true, 0, Abs<number, 0>>()
})
