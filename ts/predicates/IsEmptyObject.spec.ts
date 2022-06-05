/* eslint-disable @typescript-eslint/ban-types */
import { IsEmptyObject } from '../index.js'
import { isType } from './isType.js'

test('true for {}', () => {
  isType.t<IsEmptyObject<{}>>()
})
test('false for everything else', () => {
  isType.f<IsEmptyObject<undefined>>()
  isType.f<IsEmptyObject<false>>()
  isType.f<IsEmptyObject<0>>()
  isType.f<IsEmptyObject<''>>()
  isType.f<IsEmptyObject<{ a: 1 }>>()
})

