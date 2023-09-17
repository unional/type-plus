# Mix Types

This folder contains types and utilities that work across multiple types.

## [AnyOrNeverType](./any_or_never_type.ts)

`AnyOrNeverType<T, Then = T, Else = never>` 🎭 🩳

Filter `T` to ensure it is either exactly `any` or exactly `never`.

🌪️ *filter*
🩳 *shortcut*

```ts
import type { AnyOrNeverType } from 'type-plus'

type R = AnyOrNeverType<any> // any
type R = AnyOrNeverType<never> // never
type R = AnyOrNeverType<never, 1, 2> // 1

type R = AnyOrNeverType<unknown, 1, 2> // 2
```

## [IsAnyOrNever](./any_or_never_type.ts)

`IsAnyOrNever<T, Then = true, Else = false>` 🎭 🩳

Validate if `T` is either exactly `any` or exactly `never`.

🎭 *predicate*
🩳 *shortcut*

```ts
import type { IsAnyOrNever } from 'type-plus'

type R = IsAnyOrNever<any> // true
type R = IsAnyOrNever<never> // true

type R = IsAnyOrNever<unknown> // false
```

## [Box](./box.ts)

`Box<T, Options = { $notBoxable }>`

⚗️ *transform*
🔢 *customizable*

Converts primitive types to their boxed types.

`$notBoxable`: return type when `T` is not boxable. Defaults to `never`.

```ts
Box<number> // Number
Box<object> // Object
Box<string>  // String
Box<'abc'>  // String

Box<undefined> // never
```

## [Merge](./merge.ts)

⚗️ *transform*
🔢 *customizable*

Merges type `A` and type `B`.

This type performs the same operations as `{ ...a, ...b }` but at the type level.

This is a more general type then `ObjectPlus.Merge<A, B>`,
which constraints `A` and `B` to be `Record`.

This type does not have such restrictions, and tries to handle the other types accordingly.
