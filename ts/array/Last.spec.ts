import { AnyFunction, isType } from '..'
import { Last } from './Last'

test('any array', () => {
  type A = Last<any[]>
  isType.equal<true, any, A>()
})

test('never array', () => {
  type A = Last<never[]>
  isType.equal<true, never, A>()
})

test('typed array', () => {
  type A = Last<string[]>
  isType.equal<true, string, A>()
})

test('function array', () => {
  type A = Last<AnyFunction[]>
  isType.equal<true, AnyFunction, A>()
})

test('empty tuple gets undefined', () => {
  type A = Last<[]>
  isType.equal<true, undefined, A>()
})

test('tuple with function', () => {
  type A = Last<[number, AnyFunction]>
  isType.equal<true, AnyFunction, A>()
})
