import { assertType } from '../assertType'
import { AnyFunction } from './AnyFunction'

test('basic', () => {
  const foo: AnyFunction = x => x

  foo()
  const result = foo(false)

  // only any can be boolean here
  assertType.isBoolean(result)
})

test('define param as tuple', () =>{
  const foo: AnyFunction<[number,string]> = x => x
  foo(1, 'a')
})

test('define result type', () => {
  const foo: AnyFunction<any[], string> = x => x
  assertType.isString(foo('a'))
})
