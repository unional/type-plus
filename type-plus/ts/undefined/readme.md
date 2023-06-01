# undefined

## Type Checking

The `UndefinedType<T>` and friends are used to check if a type is `undefined` or not.

```ts
import type { UndefinedType } from 'type-plus'

type R = UndefinedType<undefined> // undefined

type R = UndefinedType<1> // never
```

- [`UndefinedType<T, Then = T, Else = never>`](undefined_type.ts#L16): check if `T` is `undefined`.
- [`IsUndefined<T, Then = true, Else = false`](undefined_type.ts#L35): is `T` `undefined`.
- [`NotUndefinedType<T, Then = T, Else = never>`](undefined_type.ts#L50): check if `T` is not `undefined`.
- [`IsNotUndefined<T, Then = true, Else = false>`](undefined_type.ts#L65): is `T` not `undefined`.
