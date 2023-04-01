# null

## Type Checking

The `NullType<T>` and friends are used to check if a type is `null` or not.

```ts
import type { NullType } from 'type-plus'

type R = NullType<null> // null

type R = NullType<1> // never
```

- [`NullType<T, Then = T, Else = never>`](null_type.ts#L16): check if `T` is `null`.
- [`IsNull<T, Then = true, Else = false`](null_type.ts#L31): is `T` `null`.
- [`NotNullType<T, Then = T, Else = never>`](null_type.ts#L46): check if `T` is not `null`.
- [`IsNotNull<T, Then = true, Else = false>`](null_type.ts#L61): is `T` not `null`.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined
