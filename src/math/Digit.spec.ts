import { Equal, isType } from '../assertion'
import { DigitArray } from './Digit'

test('no digit gets 0', () => {
  type A = DigitArray.ToNumber<[]>
  isType.true<Equal<A, 0>>()
})

test('single digit', () => {
  isType.true<Equal<DigitArray.ToNumber<[0]>, 0>>()
  isType.true<Equal<DigitArray.ToNumber<[1]>, 1>>()
  isType.true<Equal<DigitArray.ToNumber<[2]>, 2>>()
  isType.true<Equal<DigitArray.ToNumber<[3]>, 3>>()
  isType.true<Equal<DigitArray.ToNumber<[4]>, 4>>()
  isType.true<Equal<DigitArray.ToNumber<[5]>, 5>>()
  isType.true<Equal<DigitArray.ToNumber<[6]>, 6>>()
  isType.true<Equal<DigitArray.ToNumber<[7]>, 7>>()
  isType.true<Equal<DigitArray.ToNumber<[8]>, 8>>()
  isType.true<Equal<DigitArray.ToNumber<[9]>, 9>>()

})

test('two digits', () => {
  isType.true<Equal<DigitArray.ToNumber<[1, 0]>, 10>>()
  isType.true<Equal<DigitArray.ToNumber<[1, 0]>, 10>>()
  isType.true<Equal<DigitArray.ToNumber<[3, 1]>, 31>>()
  isType.true<Equal<DigitArray.ToNumber<[13, 1]>, 131>>()
  isType.true<Equal<DigitArray.ToNumber<[1, 2, 3, 4]>, 1234>>()
})

test('multi digits', () => {
  isType.true<Equal<DigitArray.ToNumber<[1, 2, 3, 4, 5]>, 12345>>()
  isType.true<Equal<DigitArray.ToNumber<[1, 2, 3, 4, 15]>, 12355>>()
})
