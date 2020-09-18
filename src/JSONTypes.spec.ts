import { assertType } from './assertType'
import { JSONTypes } from './JSONTypes'

test('empty object', () => {
  assertType<JSONTypes>({})
})

test('empty array', () => {
  assertType<JSONTypes>([])
})

test('string array', () => {
  assertType<JSONTypes>(['a'])
})
