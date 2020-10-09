import { assertType } from '../assertion'
import { Tuple } from './Tuple'

describe('Head', () => {
  test('array returns array type', () => {
    assertType<Tuple.Head<string[]>>('a')
  })

  test('tuple returns first element', () => {
    assertType<Tuple.Head<[string]>>('a')
    assertType<Tuple.Head<[string, number]>>('a')
  })
})

describe('Tail', () => {
  test('array returns array type', () => {
    assertType<Tuple.Tail<string[]>>([] as string[])
  })

  test('tuple returns tail elements', () => {
    assertType.isNever('' as Tuple.Tail<[]>)
    assertType<Tuple.Tail<[string]>>([])
    assertType<Tuple.Tail<[string, number]>>([1])
  })
})
