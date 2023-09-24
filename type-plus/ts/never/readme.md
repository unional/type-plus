# never

`never` is a bottom type in TypeScript.
That means it is a subtype of all other types.

## Type Checking

The `NeverType<T>` and friends are used to check if a type is exactly `never`.

Filter normally returns `never` in the `$else` clause.
But since we are checking for `never` here,
they have to return something other than `never`.

Therefore, `NeverType<T>` will return the `$NotNever` when `T` is not `never`,
and `NotNeverType<T>` will return the `$Never` symbol when `T` is `never`.

### [NeverType](./never_type.ts)

`NeverType<T, $Options = { $then: T, $else: $NotNever }>`

🌪️ *filter*
🔢 *customize*

Filter to ensure `T` is exactly `never`.

If it is not, returns `$NotNever`.

```ts
import type { NeverType } from 'type-plus'

type R = NeverType<never> // never

type R = NeverType<true> // $NotNever
type R = NeverType<false> // $NotNever
```

### [IsNever](./is_never.ts)

`IsNever<T, $Options = { $then: true, $else: false }>`

🎭 *predicate*
🔢 *customize*

Validate if `T` is exactly `never`.

```ts
import type { IsNever } from 'type-plus'

type R = IsNever<never> // true

type R = IsNever<true> // false
type R = IsNever<false> // false
```

### [NotNeverType](./not_never_type.ts)

`NotNeverType<T, $Options = { $then: T, $else: $Never }>`

🌪️ *filter*
🔢 *customize*

Filter `T` to ensure it is not exactly `never`.

### [IsNotNever](./is_not_never.ts)

`IsNotNever<T, $Options = { $then: true, $else: false }>`

🎭 *predicate*
🔢 *customize*

Validate if `T` is not exactly `never`.

```ts
import type { IsNotNever } from 'type-plus'

type R = IsNotNever<true> // true
type R = IsNotNever<false> // true

type R = IsNotNever<never> // false
```

## [$Never](./never.ts)

`$Never` is a special branch type to indicate the type is `never`.

It is used in [`NotNeverType`](#notnevertype).

## [$NeverOptions](./never.ts)

🧰 *type util*

`$NeverOptions` enables customizing the behavior of the `$never` branch.

The `$never` branch is used to handle when the input type is `never`.

```ts
type YourType<
  T,
  $Options extends YourType.$Options = YourType.$Default
> = ...

namespace YourType {
  export type $Options = $NeverOptions
  export type $Default = $NeverDefault
  export type $Branch = $NeverBranch
}
```

## [$NeverBranch](./never.ts)

🧰 *type util*

`$NeverBranch` is the branch option for the `$never` branch.

It sets the value to [`$Never`](#never-1),
so that the branch can be uniquely identified and handled.

Use this to allow the consumer to customize the behavior of your type.

```ts
type YourType<T, $O extends $NeverOptions> = NeverType<T> extends infer R
  ? R extends $Never
    ? $ResolveOptions<[$O['$never'], never]>
    : HandleOtherBranches<R> // R is narrowed
  : never

type R = YourType<T, $NeverBranch> extends $Never ? HandleNever : HandleOthers
```

## [$NeverDefault](./never.ts)

🧰 *type util*

`$NeverDefault` is the default option for the `$never` branch.

Unsurprisingly, defaulting `$never` to `never`.

## [$NotNever](./never.ts)

`$NotNever` is a special branch type to indicate the type is not `never`.

It is used in [`NeverType`](#nevertype).

## References

- [Handbook]
- [TypeScript Deep Dive][deep_dive]

[deep_dive]: https://basarat.gitbook.io/typescript/type-system/never
[handbook]: https://www.typescriptlang.org/docs/handbook/2/functions.html#never
