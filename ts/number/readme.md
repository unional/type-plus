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

---

`Numeric` type is either `number` or `bigint`.

The `NumericType<T>` and friends are used to check if `T` is `number` or `bigint`.

```ts
import type { NumericType } from 'type-plus'

type R = NumericType<number> // number
type R = NumericType<bigint> // bigint
type R = NumericType<1> // 1
type R = NumericType<1n> // 1n

type R = NumericType<never> // never
```

- [`NumericType<T, Then = T, Else = never>`](numeric_type.ts#L27): check if `T` is `number` or `bigint`.
- [`IsNumeric<T, Then = true, Else = false>`](numeric_type.ts#L42): is `T` `number` or `bigint`.
- [`NotNumericType<T, Then = T, Else = never>`](numeric_type.ts#L57): check if `T` is not `number` nor `bigint`.
- [`IsNotNumeric<T, Then = true, Else = false>`](numeric_type.ts#L72): is `T` not `number` nor `bigint`.

---

`Integer<T>` and friends are used to check if `T` is an integer.

```ts
import type { Integer } from 'type-plus'

type R = Integer<1> // 1
type R = Integer<1.0> // 1.0

type R = Integer<1.1> // never
```

- [`Integer<T, Then = T, Else = never>`](integer.ts#L17): check if `T` is an integer.
- [`IsInteger<T, Then = true, Else = false>`](integer.ts#L36): is `T` an integer.
- [`NotIntegerType<T, Then = T, Else = never>`](integer.ts#L51): check if `T` is not an integer.
- [`IsNotInteger<T, Then = true, Else = false>`](integer.ts#L66): is `T` not an integer.
- [`IsWholeNumber<T, Then = true, Else = false>`](integer.ts#L81): same as `Integer<T>`, will be deprecated in the future.

---

`Positive<T>` and friends are used to check if `T` is a positive numeric value, including `bigint`.

```ts
import type { Positive } from 'type-plus'

type R = Positive<1> // 1
type R = Positive<1.0> // 1.0
type R = Positive<1n> // 1n

type R = Positive<-1> // never
type R = Positive<'1'> // never
```

- [`Positive<T, Then = T, Else = never>`](positive.ts#L16): check if `T` is a positive numeric value.
- [`IsPositive<T, Then = true, Else = false>`](positive.ts#L35): is `T` a positive numeric value.
- [`NotPositiveType<T, Then = T, Else = never>`](positive.ts#L49): check if `T` is not a positive numeric value.
- [`IsNotPositive<T, Then = true, Else = false>`](positive.ts#L63): is `T` not a positive numeric value.

---

Negative

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown
