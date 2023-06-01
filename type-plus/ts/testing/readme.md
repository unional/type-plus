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
```
