# never

`never` is a bottom type in TypeScript.
That means it is a subtype of all other types.

## Type Checking

The `NeverType<T>` and friends are used to check if a type is exactly `never`.

Filter normally returns `never` in the `Else` clause.
But since we are checking for `never` here,
they have to return something other than `never`.

Therefore, `NeverType<T>` will return the `Not_Never` symbol when `T` is not `never`,
and `NotNeverType<T>` will return the `Is_Never` symbol when `T` is `never`.

```ts
import type { NeverType } from 'type-plus'

type R = NeverType<never> // never

type R = NeverType<true> // Not_Never
type R = NeverType<false> // Not_Never
```

- [`NeverType<T, Then = T, Else = Not_Never>`](never_type.ts#L16): check if `T` is exactly `never`.
- [`IsNever<T, Then = true, Else = false`](never_type.ts#L50): is `T` exactly `never`.
- [`NotNeverType<T, Then = T, Else = Is_Never>`](never_type.ts#L35): check if `T` is not exactly `never`.
- [`IsNotNever<T, Then = true, Else = false>`](never_type.ts#L65): is `T` not exactly `never`.

## References

- [Handbook]
- [TypeScript Deep Dive][deep_dive]

[deep_dive]: https://basarat.gitbook.io/typescript/type-system/never
[handbook]: https://www.typescriptlang.org/docs/handbook/2/functions.html#never
