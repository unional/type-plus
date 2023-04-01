# object

## Type Checking

The `ObjectType<T>` and friends are used to check if a type is `object` or object types

```ts
import type { ObjectType } from 'type-plus'

type R = ObjectType<unknown> // unknown

type R = ObjectType<1> // never
```

- [`UnknownType<T, Then = T, Else = never>`](unknown_type.ts#L16): check if `T` is `unknown`.
- [`IsUnknown<T, Then = true, Else = false`](unknown_type.ts#L35): is `T` `unknown`.
- [`NotUnknownType<T, Then = T, Else = never>`](unknown_type.ts#L50): check if `T` is not `unknown`.
- [`IsNotUnknown<T, Then = true, Else = false>`](unknown_type.ts#L65): is `T` not `unknown`.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown
