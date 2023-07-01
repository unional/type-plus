# Mix Types

This folder contains types and utilities that work across multiple types.

## [AnyOrNeverType](./any_or_never_type.ts)

`AnyOrNeverType<T, Then = T, Else = never>` 🎭 🩳

Parse `T` to ensure it is either exactly `any` or exactly `never`.

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

```ts
import type { IsAnyOrNever } from 'type-plus'

type R = IsAnyOrNever<any> // true
type R = IsAnyOrNever<never> // true

type R = IsAnyOrNever<unknown> // false
```
