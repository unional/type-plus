import { assertType, canAssign, ComposableTypes, isType, NonComposableTypes } from '.'

test('ComposableTypes includes object, array, and function', () => {
  assertType<ComposableTypes>({})
  assertType<ComposableTypes>([])
  // function is composable because you can do
  // `Object.assign(fn, { ... })
  assertType<ComposableTypes>(() => { })

  assertType.isTrue(canAssign<ComposableTypes>(false)(null))
  assertType.isTrue(canAssign<ComposableTypes>(false)(undefined))
  assertType.isTrue(canAssign<ComposableTypes>(false)(1))
  assertType.isTrue(canAssign<ComposableTypes>(false)(true))
  assertType.isTrue(canAssign<ComposableTypes>(false)(''))
  assertType.isTrue(canAssign<ComposableTypes>(false)(Symbol()))
})

test('NonComposableType excludes object, array, and function', () => {
  assertType<NonComposableTypes>(null)
  assertType<NonComposableTypes>(undefined)
  assertType<NonComposableTypes>(true)
  assertType<NonComposableTypes>(1)
  assertType<NonComposableTypes>('')
  assertType<NonComposableTypes>(Symbol())

  assertType.isTrue(canAssign<NonComposableTypes>(false)({}))
  assertType.isTrue(canAssign<NonComposableTypes>(false)([]))
  assertType.isTrue(canAssign<NonComposableTypes>(false)(() => { }))
})
