# number

## Type Checking

The `NumberType<T>` and friends are used to check if `T` is `number` or number literals.

```ts
import type { NumberType } from 'type-plus'

type R = NumberType<number> // number
type R = NumberType<1> // 1

type R = NumberType<bigint> // never
type R = NumberType<1n> // never
type R = NumberType<never> // never
type R = NumberType<unknown> // never
```

- [`NumberType<T, Then = T, Else = never>`](number_type.ts#L16): check if `T` is `number` or number literals.
- [`IsNumber<T, Then = true, Else = false`](number_type.ts#L35): is `T` `number` or number literals.
- [`NotNumberType<T, Then = T, Else = never>`](number_type.ts#L46): check if `T` is not `number` nor number literals.
- [`IsNotNumber<T, Then = true, Else = false>`](number_type.ts#L61): is `T` not `number` nor number literals.

---

The `StrictNumberType<T>` and friends are used to check if `T` is exactly `number`.

```ts
import type { StrictNumberType } from 'type-plus'

type R = StrictNumberType<number> // number

type R = StrictNumberType<1> // never
type R = StrictNumberType<never> // never
type R = StrictNumberType<unknown> // never
```

- [`StrictNumberType<T, Then = T, Else = never>`](strict_number_type.ts#L16): check if `T` is `number`.
- [`IsStrictNumber<T, Then = true, Else = false`](strict_number_type.ts#L35): is `T` `number`.
- [`NotStrictNumberType<T, Then = T, Else = never>`](strict_number_type.ts#L50): check if `T` is not `number`.
- [`IsNotStrictNumber<T, Then = true, Else = false>`](strict_number_type.ts#L65): is `T` not `number`.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean
