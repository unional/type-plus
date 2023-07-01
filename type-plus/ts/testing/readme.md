# testing

This folder contains utilities for testing.

## `testType`

`testType` is a test utilities for types.

This is designed specifically for testing.
The return value is the input `expected` parameter asserted as the first type parameter,
so that the type can be further inspected.

```ts
import { testType } from 'type-plus'

testType.any<T>(true) // T is `any`
testType.equal<A, B>(true) // A is equal to B
testType.never<T>(false) // T is not `never`

const t = testType.equal<SomeComplexType, SomeCompositeType>(true)
type T = typeof t // type resolution
```

## [testType.inspect](./test_type.ts)

`testType.inspect<T>(fn)`

A quick way to inspect a type.

```ts
import { testType } from 'type-plus'

testType.inspect<SomeType>(t => {
  type T = typeof t.type // type resolution
})
```

It also provides additional methods and predefined inspections so that you can quickly check how the type behaves in specific cases.

```ts
import { testType } from 'type-plus'

testType.inspect<SomeType>(t => {
  t.extends<AnotherType>() // true or false
  t.union<number>() // SomeType | number`
  t.intersect<string>() // `SomeType & string`
  t.extends_boolean // true or false
})
```
