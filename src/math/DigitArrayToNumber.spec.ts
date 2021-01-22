import { Equal, isType } from '../assertion'
import { DigitArrayToNumber2 } from './DigitArrayToNumber'

test('no digit gets 0', () => {
  type A = DigitArrayToNumber2<[]>
  isType.true<Equal<A, 0>>()
})

test('single digit', () => {
  isType.true<Equal<DigitArrayToNumber2<[0]>, 0>>()
  isType.true<Equal<DigitArrayToNumber2<[1]>, 1>>()
  isType.true<Equal<DigitArrayToNumber2<[2]>, 2>>()
  isType.true<Equal<DigitArrayToNumber2<[3]>, 3>>()
  isType.true<Equal<DigitArrayToNumber2<[4]>, 4>>()
  isType.true<Equal<DigitArrayToNumber2<[5]>, 5>>()
  isType.true<Equal<DigitArrayToNumber2<[6]>, 6>>()
  isType.true<Equal<DigitArrayToNumber2<[7]>, 7>>()
  isType.true<Equal<DigitArrayToNumber2<[8]>, 8>>()
  isType.true<Equal<DigitArrayToNumber2<[9]>, 9>>()

})

test('two digits', () => {
  isType.true<Equal<DigitArrayToNumber2<[1, 0]>, 10>>()
  isType.true<Equal<DigitArrayToNumber2<[1, 0]>, 10>>()
  isType.true<Equal<DigitArrayToNumber2<[3, 1]>, 31>>()
  isType.true<Equal<DigitArrayToNumber2<[13, 1]>, 131>>()
})

// test('multi digits', () => {
//   isType.true<Equal<DigitArrayToNumber2<[1, 2, 3, 4, 5]>, 12345>>()
//   isType.true<Equal<DigitArrayToNumber2<[1, 2, 3, 4, 15]>, 12355>>()
// })
