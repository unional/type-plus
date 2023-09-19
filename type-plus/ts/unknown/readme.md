# unknown

`unknown` is one of the top type in TypeScript.
It is a "safer" variant of `any` that you cannot use the value until there are some type guards or type assertions to the value.

## Type Checking

The `UnknownType<T>` and friends are used to check if a type is `unknown` or not.

They are strict type checks, meaning they match only the type `unknown`.
Union are not a factor here as they are resolved to `unknown`,
Intersection however will almost always resolve the the other type (`unknown & T -> T`).

### [UnknownType](./unknown_type.ts)

`UnknownType<T, $Options = { $then: T, $else: never }>`

🌪️ *filter*
🔢 *customize*

Filter to ensure `T` is exactly `unknown`.

```ts
import type { UnknownType } from 'type-plus'

type R = UnknownType<unknown> // unknown

type R = UnknownType<1> // never
```

### [IsUnknown](./is_unknown.ts)

`IsUnknown<T, $Options = { $then: true, $else: false }>`

🎭 *predicate*
🔢 *customize*

Validate if `T` is exactly `unknown`.

```ts
import type { IsUnknown } from 'type-plus'

type R = IsUnknown<unknown> // true

type R = IsUnknown<1> // false
```

### [NotUnknownType](./not_unknown_type.ts)

`NotUnknownType<T, $Options = { $then: T, $else: never }>`

🌪️ *filter*
🔢 *customize*

Filter `T` to ensure it is not exactly `unknown`.

```ts
import type { NotUnknownType } from 'type-plus'

type R = NotUnknownType<unknown> // never

type R = NotUnknownType<1> // 1
```

### [IsNotUnknown](./is_not_unknown.ts)

`IsNotUnknown<T, $Options = { $then: true, $else: false }>`

🎭 *predicate*
🔢 *customize*

Validate if `T` is not exactly `unknown`.

```ts
import type { IsNotUnknown } from 'type-plus'

type R = IsNotUnknown<unknown> // true

type R = IsNotUnknown<1> // false
```

### [NotUnknownOr](./not_unknown_or.ts)

`NotUnknownOr<T, Else>`

🌪️ *filter*
🔢 *customize*

Returns `T` if `T` is not `unknown`, otherwise `Else`.

```ts
import type { NotUnknownOr, $Unknown } from 'type-plus'

type R = NotUnknownOr<number> // number
type R = NotUnknownOr<unknown> // $Unknown

type R = NotUnknownOr<unknown, 1> // 1
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown
