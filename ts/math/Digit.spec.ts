import { Equal, isType } from '..'
import { Digit, DigitArray } from './Digit'

describe('DigitArray.ToNumber<DA>', () => {
  test('no digit gets 0', () => {
    type A = DigitArray.ToNumber<[]>
    isType.t<Equal<A, 0>>()
  })

  test('single digit', () => {
    isType.t<Equal<DigitArray.ToNumber<[0]>, 0>>()
    isType.t<Equal<DigitArray.ToNumber<[1]>, 1>>()
    isType.t<Equal<DigitArray.ToNumber<[2]>, 2>>()
    isType.t<Equal<DigitArray.ToNumber<[3]>, 3>>()
    isType.t<Equal<DigitArray.ToNumber<[4]>, 4>>()
    isType.t<Equal<DigitArray.ToNumber<[5]>, 5>>()
    isType.t<Equal<DigitArray.ToNumber<[6]>, 6>>()
    isType.t<Equal<DigitArray.ToNumber<[7]>, 7>>()
    isType.t<Equal<DigitArray.ToNumber<[8]>, 8>>()
    isType.t<Equal<DigitArray.ToNumber<[9]>, 9>>()

  })

  test('two digits', () => {
    isType.t<Equal<DigitArray.ToNumber<[1, 0]>, 10>>()
    isType.t<Equal<DigitArray.ToNumber<[1, 0]>, 10>>()
    isType.t<Equal<DigitArray.ToNumber<[3, 1]>, 31>>()
    isType.t<Equal<DigitArray.ToNumber<[13, 1]>, 131>>()
    isType.t<Equal<DigitArray.ToNumber<[1, 2, 3, 4]>, 1234>>()
  })

  test('multi digits', () => {
    isType.t<Equal<DigitArray.ToNumber<[1, 2, 3, 4]>, 1234>>()
    isType.t<Equal<DigitArray.ToNumber<[1, 2, 3, 5]>, 1235>>()
  })
})

describe('DigitArray.Shift10<DA>', () => {
  test('zero digit gets the same', () => {
    isType.equal<true, [], DigitArray.Shift10<[]>>()
  })

  test('single digit gets the same', () => {
    isType.equal<true, [5], DigitArray.Shift10<[5]>>()
  })

  test('two digits with leading 0 get trimmed', () => {
    isType.equal<true, [5], DigitArray.Shift10<[0, 5]>>()
  })
  test('two digits gets value shifted', () => {
    isType.equal<true, [15], DigitArray.Shift10<[1, 5]>>()
    isType.equal<true, [8, 10], DigitArray.Shift10<[9, 0]>>()
    isType.equal<true, [8, 19], DigitArray.Shift10<[9, 9]>>()
  })
  test('multiple digits', () => {
    isType.equal<true, [11, 12, 14], DigitArray.Shift10<[0, 1, 2, 3, 4]>>()
  })
})


describe('Digit.GreaterThan<A, B>', () => {
  test('n > n is false', () => {
    isType.equal<true, false, Digit.GreaterThan<0, 0>>()
    isType.equal<true, false, Digit.GreaterThan<1, 1>>()
    isType.equal<true, false, Digit.GreaterThan<2, 2>>()
    isType.equal<true, false, Digit.GreaterThan<3, 3>>()
    isType.equal<true, false, Digit.GreaterThan<4, 4>>()
    isType.equal<true, false, Digit.GreaterThan<5, 5>>()
    isType.equal<true, false, Digit.GreaterThan<6, 6>>()
    isType.equal<true, false, Digit.GreaterThan<7, 7>>()
    isType.equal<true, false, Digit.GreaterThan<8, 8>>()
    isType.equal<true, false, Digit.GreaterThan<9, 9>>()
  })
  test('N > m is true', () => {
    isType.equal<true, true, Digit.GreaterThan<1, 0>>()
    isType.equal<true, true, Digit.GreaterThan<2, 0>>()
    isType.equal<true, true, Digit.GreaterThan<3, 0>>()
    isType.equal<true, true, Digit.GreaterThan<4, 0>>()
    isType.equal<true, true, Digit.GreaterThan<5, 0>>()
    isType.equal<true, true, Digit.GreaterThan<6, 0>>()
    isType.equal<true, true, Digit.GreaterThan<7, 0>>()
    isType.equal<true, true, Digit.GreaterThan<8, 0>>()
    isType.equal<true, true, Digit.GreaterThan<9, 0>>()

    isType.equal<true, true, Digit.GreaterThan<2, 1>>()
    isType.equal<true, true, Digit.GreaterThan<3, 1>>()
    isType.equal<true, true, Digit.GreaterThan<4, 1>>()
    isType.equal<true, true, Digit.GreaterThan<5, 1>>()
    isType.equal<true, true, Digit.GreaterThan<6, 1>>()
    isType.equal<true, true, Digit.GreaterThan<7, 1>>()
    isType.equal<true, true, Digit.GreaterThan<8, 1>>()
    isType.equal<true, true, Digit.GreaterThan<9, 1>>()

    isType.equal<true, true, Digit.GreaterThan<3, 2>>()
    isType.equal<true, true, Digit.GreaterThan<4, 2>>()
    isType.equal<true, true, Digit.GreaterThan<5, 2>>()
    isType.equal<true, true, Digit.GreaterThan<6, 2>>()
    isType.equal<true, true, Digit.GreaterThan<7, 2>>()
    isType.equal<true, true, Digit.GreaterThan<8, 2>>()
    isType.equal<true, true, Digit.GreaterThan<9, 2>>()

    isType.equal<true, true, Digit.GreaterThan<4, 3>>()
    isType.equal<true, true, Digit.GreaterThan<5, 3>>()
    isType.equal<true, true, Digit.GreaterThan<6, 3>>()
    isType.equal<true, true, Digit.GreaterThan<7, 3>>()
    isType.equal<true, true, Digit.GreaterThan<8, 3>>()
    isType.equal<true, true, Digit.GreaterThan<9, 3>>()

    isType.equal<true, true, Digit.GreaterThan<5, 4>>()
    isType.equal<true, true, Digit.GreaterThan<6, 4>>()
    isType.equal<true, true, Digit.GreaterThan<7, 4>>()
    isType.equal<true, true, Digit.GreaterThan<8, 4>>()
    isType.equal<true, true, Digit.GreaterThan<9, 4>>()

    isType.equal<true, true, Digit.GreaterThan<6, 5>>()
    isType.equal<true, true, Digit.GreaterThan<7, 5>>()
    isType.equal<true, true, Digit.GreaterThan<8, 5>>()
    isType.equal<true, true, Digit.GreaterThan<9, 5>>()

    isType.equal<true, true, Digit.GreaterThan<7, 6>>()
    isType.equal<true, true, Digit.GreaterThan<8, 6>>()
    isType.equal<true, true, Digit.GreaterThan<9, 6>>()

    isType.equal<true, true, Digit.GreaterThan<8, 7>>()
    isType.equal<true, true, Digit.GreaterThan<9, 7>>()

    isType.equal<true, true, Digit.GreaterThan<9, 8>>()
  })

  test('n > M is false', () => {
    isType.equal<true, false, Digit.GreaterThan<0, 1>>()
    isType.equal<true, false, Digit.GreaterThan<0, 2>>()
    isType.equal<true, false, Digit.GreaterThan<0, 3>>()
    isType.equal<true, false, Digit.GreaterThan<0, 4>>()
    isType.equal<true, false, Digit.GreaterThan<0, 5>>()
    isType.equal<true, false, Digit.GreaterThan<0, 6>>()
    isType.equal<true, false, Digit.GreaterThan<0, 7>>()
    isType.equal<true, false, Digit.GreaterThan<0, 8>>()
    isType.equal<true, false, Digit.GreaterThan<0, 9>>()

    isType.equal<true, false, Digit.GreaterThan<1, 2>>()
    isType.equal<true, false, Digit.GreaterThan<1, 3>>()
    isType.equal<true, false, Digit.GreaterThan<1, 4>>()
    isType.equal<true, false, Digit.GreaterThan<1, 5>>()
    isType.equal<true, false, Digit.GreaterThan<1, 6>>()
    isType.equal<true, false, Digit.GreaterThan<1, 7>>()
    isType.equal<true, false, Digit.GreaterThan<1, 8>>()
    isType.equal<true, false, Digit.GreaterThan<1, 9>>()

    isType.equal<true, false, Digit.GreaterThan<2, 3>>()
    isType.equal<true, false, Digit.GreaterThan<2, 4>>()
    isType.equal<true, false, Digit.GreaterThan<2, 5>>()
    isType.equal<true, false, Digit.GreaterThan<2, 6>>()
    isType.equal<true, false, Digit.GreaterThan<2, 7>>()
    isType.equal<true, false, Digit.GreaterThan<2, 8>>()
    isType.equal<true, false, Digit.GreaterThan<2, 9>>()

    isType.equal<true, false, Digit.GreaterThan<3, 4>>()
    isType.equal<true, false, Digit.GreaterThan<3, 5>>()
    isType.equal<true, false, Digit.GreaterThan<3, 6>>()
    isType.equal<true, false, Digit.GreaterThan<3, 7>>()
    isType.equal<true, false, Digit.GreaterThan<3, 8>>()
    isType.equal<true, false, Digit.GreaterThan<3, 9>>()

    isType.equal<true, false, Digit.GreaterThan<4, 5>>()
    isType.equal<true, false, Digit.GreaterThan<4, 6>>()
    isType.equal<true, false, Digit.GreaterThan<4, 7>>()
    isType.equal<true, false, Digit.GreaterThan<4, 8>>()
    isType.equal<true, false, Digit.GreaterThan<4, 9>>()

    isType.equal<true, false, Digit.GreaterThan<5, 6>>()
    isType.equal<true, false, Digit.GreaterThan<5, 7>>()
    isType.equal<true, false, Digit.GreaterThan<5, 8>>()
    isType.equal<true, false, Digit.GreaterThan<5, 9>>()

    isType.equal<true, false, Digit.GreaterThan<6, 7>>()
    isType.equal<true, false, Digit.GreaterThan<6, 8>>()
    isType.equal<true, false, Digit.GreaterThan<6, 9>>()

    isType.equal<true, false, Digit.GreaterThan<7, 8>>()
    isType.equal<true, false, Digit.GreaterThan<7, 9>>()

    isType.equal<true, false, Digit.GreaterThan<8, 9>>()
  })
})
