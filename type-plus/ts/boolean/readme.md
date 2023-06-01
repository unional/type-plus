# boolean

`boolean` is a type that represents the two values: `true` and `false`.

Unlike other types, `boolean` is a primitive union type.
It is exactly equivalent to the union type `true | false`.

## Type Checking

The `BooleanType<T>` and friends are used to check if a type is `boolean` or not.

It matches `boolean`, `true`, and `false`.

```ts
import type { BooleanType } from 'type-plus'

type R = BooleanType<boolean> // boolean
type R = BooleanType<true> // true
type R = BooleanType<false> // false

type R = BooleanType<1> // never
```

- [`BooleanType<T, Then = T, Else = never>`](boolean_type.ts#L17): check if `T` is `boolean`, `true`, or `false`.
- [`IsBoolean<T, Then = true, Else = false`](boolean_type.ts#L37): is `T` `boolean`.
- [`NotBooleanType<T, Then = T, Else = never>`](boolean_type.ts#L53): check if `T` is not `boolean`, `true`, nor `false`.
- [`IsNotBoolean<T, Then = true, Else = false>`](boolean_type.ts#L69): is `T` not `boolean`.

---

The `StrictBooleanType<T>` and friends are used to check if a type is exactly `boolean` or not.

It matches only the type `boolean`.

```ts
import type { StrictBooleanType } from 'type-plus'

type R = StrictBooleanType<boolean> // boolean

type R = StrictBooleanType<true> // never
type R = StrictBooleanType<false> // never
```

- [`StrictBooleanType<T, Then = T, Else = never>`](strict_boolean_type.ts#L16): check if `T` is exactly `boolean`.
- [`IsStrictBoolean<T, Then = true, Else = false`](strict_boolean_type.ts#L50): is `T` exactly `boolean`.
- [`NotStrictBooleanType<T, Then = T, Else = never>`](strict_boolean_type.ts#L35): check if `T` is not exactly `boolean`.
- [`IsNotStrictBoolean<T, Then = true, Else = false>`](strict_boolean_type.ts#L65): is `T` not exactly `boolean`.

---

The `TrueType<T>` and friends are used to check if a type is `true` or not.

It matches only `true`.

```ts
import type { TrueType } from 'type-plus'

type R = TrueType<true> // true

type R = TrueType<boolean> // never
```

- [`TrueType<T, Then = T, Else = never>`](true_type.ts#L16): check if `T` is `true`.
- [`IsTrue<T, Then = true, Else = false`](true_type.ts#L35): is `T` `true`.
- [`NotTrueType<T, Then = T, Else = never>`](true_type.ts#L49): check if `T` is not `true`.
- [`IsNotTrue<T, Then = true, Else = false>`](true_type.ts#L63): is `T` not `true`.

---

The `FalseType<T>` and friends are used to check if a type is `false` or not.

It matches only `false`.

```ts
import type { FalseType } from 'type-plus'

type R = FalseType<false> // false

type R = FalseType<boolean> // never
```

- [`FalseType<T, Then = T, Else = never>`](false_type.ts#L16): check if `T` is `false`.
- [`IsFalse<T, Then = true, Else = false`](false_type.ts#L35): is `T` `false`.
- [`NotFalseType<T, Then = T, Else = never>`](false_type.ts#L49): check if `T` is not `false`.
- [`IsNotFalse<T, Then = true, Else = false>`](false_type.ts#L63): is `T` not `false`.
