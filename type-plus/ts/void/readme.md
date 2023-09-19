# void

`void` is a type that represents the absence of type information.
It is typically used as the return type of a function that does not explicitly return a value.

## Type Checking

The `VoidType<T>` and friends are used to check if a type is exactly `void`.

```ts
import type { VoidType } from 'type-plus'

type R = VoidType<void> // void

type R = VoidType<1> // never
```

- [`VoidType<T, Then = T, Else = never>`](void_type.ts#L15): check if `T` is `void`.
- [`IsVoid<T, Then = true, Else = false`](void_type.ts#L32): is `T` `void`.
- [`NotVoidType<T, Then = T, Else = never>`](void_type.ts#L45): check if `T` is not `void`.
- [`IsNotVoid<T, Then = true, Else = false>`](void_type.ts#L58): is `T` not `void`.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/functions.html#void
