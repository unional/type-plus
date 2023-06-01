# Tuple

A *tuple type* is another sort of `Array` type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.

## Type Checking

The `TupleType<T>` and friends are used to check if `T` is a tuple, excluding array.

```ts
import type { TupleType } from 'type-plus'

type R = TupleType<[]> // []
type R = TupleType<[1]> // [1]

type R = TupleType<number[]> // never
type R = TupleType<number> // never
```

- [`TupleType<T, Then = T, Else = never>`](tuple_type.ts#L16): check if `T` is a *tuple*.
- [`IsTuple<T, Then = true, Else = false`](tuple_type.ts#L35): is `T` *tuple*.
- [`NotTupleType<T, Then = T, Else = never>`](tuple_type.ts#L50): check if `T` is not *tuple*.
- [`IsNotTuple<T, Then = true, Else = false>`](tuple_type.ts#L65): is `T` not *tuple*.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
