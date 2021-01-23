import { Equal, isType } from '../assertion'
import { DigitArrayToNumber } from './DigitArrayToNumber'

test('no digit gets 0', () => {
  type A = DigitArrayToNumber<[]>
  isType.true<Equal<A, 0>>()
})

test('single digit', () => {
  isType.true<Equal<DigitArrayToNumber<[0]>, 0>>()
  isType.true<Equal<DigitArrayToNumber<[1]>, 1>>()
  isType.true<Equal<DigitArrayToNumber<[2]>, 2>>()
  isType.true<Equal<DigitArrayToNumber<[3]>, 3>>()
  isType.true<Equal<DigitArrayToNumber<[4]>, 4>>()
  isType.true<Equal<DigitArrayToNumber<[5]>, 5>>()
  isType.true<Equal<DigitArrayToNumber<[6]>, 6>>()
  isType.true<Equal<DigitArrayToNumber<[7]>, 7>>()
  isType.true<Equal<DigitArrayToNumber<[8]>, 8>>()
  isType.true<Equal<DigitArrayToNumber<[9]>, 9>>()

})

test('two digits', () => {
  isType.true<Equal<DigitArrayToNumber<[1, 0]>, 10>>()
  isType.true<Equal<DigitArrayToNumber<[1, 0]>, 10>>()
  isType.true<Equal<DigitArrayToNumber<[3, 1]>, 31>>()
  isType.true<Equal<DigitArrayToNumber<[13, 1]>, 131>>()
  isType.true<Equal<DigitArrayToNumber<[1, 2, 3, 4]>, 1234>>()
})

test('multi digits', () => {
  isType.true<Equal<DigitArrayToNumber<[1, 2, 3, 4, 5]>, 12345>>()
  isType.true<Equal<DigitArrayToNumber<[1, 2, 3, 4, 15]>, 12355>>()
})
